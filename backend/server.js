const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); // or require('bcryptjs') if using bcryptjs
const jwt = require('jsonwebtoken'); // import jsonwebtoken
const multer = require('multer');

const app = express();
const port = 3001;

// Load environment variables from config file
dotenv.config({ path: './config.env' });
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('MongoDB Connection Error:', error);
    });

// Middleware to parse JSON in request body
app.use(express.json());

// Define the schema for the SureTrustUser
const sureTrustUserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true,
  }
});

const SureTrustUser = mongoose.model('SureTrustUser', sureTrustUserSchema);

// Login route
app.post('/sure/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await SureTrustUser.findOne({ email });
      if (!user) {
          return res.json({ success: false, message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.json({ success: false, message: 'Invalid credentials' });
      }

      const token = jwt.sign(
          { id: user._id, name: user.name }, // Add name here
          'secretkey',
          { expiresIn: '1h' }
      );

      res.json({ success: true, token });
  } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Signup route
app.post('/sure/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new SureTrustUser({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Define the schema for Project
const projectSchema = new mongoose.Schema({
  image: {
    type: String, // Base64-encoded image
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  domainName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('Project', projectSchema);

// Define the schema for Domain
const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Domain = mongoose.model('Domain', domainSchema);

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// POST route to add a project
app.post('/sure/projects', upload.single('image'), async (req, res) => {
  const { projectName, domainName, ownerName, description } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null; // Get image as binary data

  if (!imageBuffer) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  try {
    let domain = await Domain.findOne({ name: domainName });
    
    if (!domain) {
      domain = new Domain({ name: domainName });
      await domain.save();
    }

    const imageBase64 = imageBuffer.toString('base64');
    const imageData = `data:${req.file.mimetype};base64,${imageBase64}`;

    const newProject = new Project({
      image: imageData,
      projectName,
      domainName,
      ownerName,
      description
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', data: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to retrieve projects with images
app.get('/sure/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route to add a domain
app.post('/sure/domains', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Domain name is required' });
  }

  try {
    const newDomain = new Domain({ name });
    await newDomain.save();
    res.status(201).json({ message: 'Domain created successfully', data: newDomain });
  } catch (error) {
    console.error('Error creating domain:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to retrieve all domains
app.get('/sure/domains', async (req, res) => {
  try {
    const domains = await Domain.find();
    res.status(200).json(domains);
  } catch (error) {
    console.error('Error retrieving domains:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the schema for Course and Trainer
const TrainerSchema = new mongoose.Schema({
  name: String,
  qualification: String,
  position: String,
  company: String,
  profilePic: String // URL to the profile picture
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  eligibility: { type: String, required: true },
  trainers: [TrainerSchema]
});

const Course = mongoose.model('SureCourse', CourseSchema);

// Get All Courses
app.get('/sure/courses', async (req, res) => {
  try {
      const courses = await Course.find();
      res.json(courses);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Get a Single Course
app.get('/sure/courses/:id', async (req, res) => {
  try {
      const course = await Course.findById(req.params.id);
      res.json(course);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const convertFileToBase64 = (file) => {
  return file.buffer.toString('base64');
};

// Create a New Course with file upload
app.post('/sure/courses', upload.fields([
  { name: 'profilePic1', maxCount: 1 },
  { name: 'profilePic2', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);

    const trainers = Array.isArray(req.body.trainers) ? req.body.trainers : JSON.parse(req.body.trainers);

    const mappedTrainers = trainers.map((trainer, index) => {
      let profilePicBase64 = null;
      
      if (req.files[`profilePic${index + 1}`]) {
        profilePicBase64 = convertFileToBase64(req.files[`profilePic${index + 1}`][0]);
      }
      
      if (trainer.profilePic && !profilePicBase64) {
        profilePicBase64 = convertUrlToBase64(trainer.profilePic);
      }

      return {
        ...trainer,
        profilePic: profilePicBase64
      };
    });

    const course = new Course({
      name: req.body.name,
      duration: req.body.duration,
      eligibility: req.body.eligibility,
      trainers: mappedTrainers
    });

    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/sure/courses/byname/:name', async (req, res) => {
  try {
    const course = await Course.findOne({ name: req.params.name });
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a Course
app.put('/sure/courses/:id', async (req, res) => {
  try {
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCourse);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Delete a Course
app.delete('/sure/courses/:id', async (req, res) => {
  try {
      await Course.findByIdAndDelete(req.params.id);
      res.json({ message: 'Course deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Define the schema for Registration
const registrationSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SureCourse',
    required: true
  },
  user: {
    name: String,
    email: String,
    phone: String
  }
});

const Registration = mongoose.model('Registration', registrationSchema);

// Handle registration
app.post('/register', async (req, res) => {
  try {
    const { course, user } = req.body;
    
    const registration = new Registration({
      course: course._id, // Assuming course has an _id field
      user: user
    });
    
    await registration.save();
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register', error: err.message });
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.post('/register', async (req, res) => {
  try {
    const { course, user } = req.body;
    
    const registration = new Registration({
      course: mongoose.Types.ObjectId(course), // Ensure the course ID is an ObjectId
      user: user
    });
    
    await registration.save();
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register', error: err.message });
  }
});
