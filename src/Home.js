import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import Collaborators from './cmpo/Collaborators';
import Header from './cmpo/Header'; 
import './Home.css';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({
    studentsTraining: 0,
    studentsCompleted: 0,
    studentsPlaced: 0,
    courses: 0,
    ongoingBatches: 0,
    trainers: 0,
  });
  const navigate = useNavigate();

  const move = () => {
    navigate('/courses');
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/sure/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching projects');
        setLoading(false);
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const durations = {
      studentsTraining: 300,
      studentsCompleted: 1000,
      studentsPlaced: 300,
      courses: 28,
      ongoingBatches: 25,
      trainers: 135
    };

    const incrementCounts = () => {
      setCounts((prevCounts) => ({
        studentsTraining: Math.min(prevCounts.studentsTraining + Math.ceil(durations.studentsTraining / 100), durations.studentsTraining),
        studentsCompleted: Math.min(prevCounts.studentsCompleted + Math.ceil(durations.studentsCompleted / 100), durations.studentsCompleted),
        studentsPlaced: Math.min(prevCounts.studentsPlaced + Math.ceil(durations.studentsPlaced / 100), durations.studentsPlaced),
        courses: Math.min(prevCounts.courses + Math.ceil(durations.courses / 100), durations.courses),
        ongoingBatches: Math.min(prevCounts.ongoingBatches + Math.ceil(durations.ongoingBatches / 100), durations.ongoingBatches),
        trainers: Math.min(prevCounts.trainers + Math.ceil(durations.trainers / 100), durations.trainers),
      }));
    };

    const interval = setInterval(incrementCounts, 20);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Students Undergoing Training', value: counts.studentsTraining },
    { label: 'Students Completed Training', value: counts.studentsCompleted },
    { label: 'Students Placed', value: counts.studentsPlaced },
    { label: 'Courses', value: counts.courses },
    { label: 'Ongoing Batches', value: counts.ongoingBatches },
    { label: 'Trainers', value: counts.trainers }
  ];

  return (
    <>
      <Header />
      <div className="homepage">
        <div className="Animation">
          <h1>WELCOME TO SURE TRUST</h1>
        </div>
        <section className="main-content">
          <div className="text-content">
            <h3>Skill Upgradation for Rural-youth Empowerment</h3>
            <div className="buttons">
              <button onClick={move} className="btn secondary">Explore Courses</button>
            </div>
          </div>
          <div className="video-content">
            <iframe
              width="560"
              height="330"
              src="https://www.youtube.com/embed/YTu-pnGVgJQ"
              title="SURE Trust Graduation Ceremony"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

        </section>

        <div className="statistics-section">
          <div className="statistics-cards">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}+</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <section className="internship-projects">
          <h2>Internship Projects</h2>
          <div className="projects-grid">
            {loading ? (
              Array(6).fill(null).map((_, index) => (
                <div className="project-card" key={index}>
                  <Skeleton height={200} />
                  <div className="project-info">
                    <Skeleton width={100} height={20} />
                    <Skeleton width={200} height={30} />
                    <Skeleton count={3} />
                  </div>
                </div>
              ))
            ) : error ? (
              <p>{error}</p>
            ) : projects.length === 0 ? (
              <p>No projects available</p>
            ) : (
              projects.map((project, index) => (
                <div className="project-card" key={index}>
                  <img 
                    src={project.image} 
                    alt={project.projectName} 
                    style={{ width: '100%', height: 'auto' }} 
                  />
                  <div className="project-info">
                    <p className="domain">{project.domainName}</p>
                    <h3>{project.projectName}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <Collaborators />
        </section>
      </div>
    </>
  );
};

export default Home;
