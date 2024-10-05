import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

const Courses = ({ course }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/register/${course._id}`); 
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card course-card">
        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text">{course.description}</p>
          <p className="card-text"><small className="text-muted">{course.eligibility}</small></p>
          <div className="d-flex justify-content-between">
            <button
              onClick={() => navigate(`/courseDetails/${course.title}`)}
              className="btn btn-primary"
            >
              Explore
            </button>
            <button className="btn btn-secondary">Share</button>
            <button
              onClick={handleRegisterClick}
              className="btn btn-success"
            >
              Register Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
