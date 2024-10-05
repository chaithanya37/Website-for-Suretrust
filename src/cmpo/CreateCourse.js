import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
  const [course, setCourse] = useState({
    name: '',
    duration: '',
    eligibility: '',
    trainers: [{ name: '', qualification: '', position: '', company: '', profilePic: null }]
  });

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({ ...prevCourse, [name]: value }));
  };

  const handleTrainerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTrainers = course.trainers.map((trainer, i) =>
      i === index ? { ...trainer, [name]: value } : trainer
    );
    setCourse(prevCourse => ({ ...prevCourse, trainers: updatedTrainers }));
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const updatedTrainers = course.trainers.map((trainer, i) =>
      i === index ? { ...trainer, profilePic: file } : trainer
    );
    setCourse(prevCourse => ({ ...prevCourse, trainers: updatedTrainers }));
  };

  const addTrainer = () => {
    setCourse(prevCourse => ({
      ...prevCourse,
      trainers: [...prevCourse.trainers, { name: '', qualification: '', position: '', company: '', profilePic: null }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', course.name);
    formData.append('duration', course.duration);
    formData.append('eligibility', course.eligibility);
    formData.append('trainers', JSON.stringify(course.trainers));
  
    try {
      const response = await axios.post('http://localhost:3001/sure/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Course added:', response.data);
      setCourse({
        name: '',
        duration: '',
        eligibility: '',
        trainers: [{ name: '', qualification: '', position: '', company: '', profilePic: '' }]
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  
  return (
    <div>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Course Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={course.name}
            onChange={handleCourseChange}
            required
          />
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={course.duration}
            onChange={handleCourseChange}
            required
          />
        </div>
        <div>
          <label htmlFor="eligibility">Eligibility:</label>
          <input
            type="text"
            id="eligibility"
            name="eligibility"
            value={course.eligibility}
            onChange={handleCourseChange}
            required
          />
        </div>

        <h3>Trainers</h3>
        {course.trainers.map((trainer, index) => (
          <div key={index}>
            <h4>Trainer {index + 1}</h4>
            <div>
              <label htmlFor={`trainerName${index}`}>Name:</label>
              <input
                type="text"
                id={`trainerName${index}`}
                name="name"
                value={trainer.name}
                onChange={(e) => handleTrainerChange(index, e)}
                required
              />
            </div>
            <div>
              <label htmlFor={`trainerQualification${index}`}>Qualification:</label>
              <input
                type="text"
                id={`trainerQualification${index}`}
                name="qualification"
                value={trainer.qualification}
                onChange={(e) => handleTrainerChange(index, e)}
                required
              />
            </div>
            <div>
              <label htmlFor={`trainerPosition${index}`}>Position:</label>
              <input
                type="text"
                id={`trainerPosition${index}`}
                name="position"
                value={trainer.position}
                onChange={(e) => handleTrainerChange(index, e)}
                required
              />
            </div>
            <div>
              <label htmlFor={`trainerCompany${index}`}>Company:</label>
              <input
                type="text"
                id={`trainerCompany${index}`}
                name="company"
                value={trainer.company}
                onChange={(e) => handleTrainerChange(index, e)}
                required
              />
            </div>
            <div>
              <label htmlFor={`trainerProfilePic${index}`}>Profile Picture:</label>
              <input
                type="file"
                id={`trainerProfilePic${index}`}
                name={`profilePic${index}`}
                onChange={(e) => handleFileChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addTrainer}>Add Another Trainer</button>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
