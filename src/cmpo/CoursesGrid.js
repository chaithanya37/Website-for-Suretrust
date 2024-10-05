import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Courses from './Courses';
import './CoursesGrid.css';

const CoursesGrid = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/sure/courses');
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container11 my-5">
      <h2 className="text-center mb-4">Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <Courses
            key={course._id}
            course={{
              title: course.name,
              description: course.eligibility,
              eligibility: course.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesGrid;
