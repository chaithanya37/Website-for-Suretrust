import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { name } = useParams();
  console.log("name man",name);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/sure/courses/byname/${name}`);
        console.log("her eressssssssss",response);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>No course details available</p>;

  return (
    <div className="container3 my-5">
      <h2 className="text-center mb-4">{course.name}</h2>
      <p className='bb'><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Eligibility:</strong> {course.eligibility}</p>
      <h3>Trainers</h3>
      <div className="row">
        {course.trainers.map((trainer, index) => {
          const profilePicUrl = trainer.profilePic ? `data:image/jpeg;base64,${trainer.profilePic}` : '';

          return (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={profilePicUrl}
                  className="card-img-top"
                  alt={`${trainer.name}'s profile`}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{trainer.name}</h5>
                  <p className="card-text"><strong>Qualification:</strong> {trainer.qualification}</p>
                  <p className="card-text"><strong>Position:</strong> {trainer.position}</p>
                  <p className="card-text"><strong>Company:</strong> {trainer.company}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetails;
