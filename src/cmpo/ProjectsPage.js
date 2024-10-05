import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectsPage.css'; // Import your CSS file
import Skeleton from 'react-loading-skeleton'; // Import Skeleton component

const ProjectsPage = () => {
  const { domain } = useParams();
  console.log("domain",domain);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get('http://localhost:3001/sure/projects'); // Fetch all projects
        console.log("Res",response);
        setProjects(response.data);

        // Filter projects based on domain
        if (domain) {
          const filtered = response.data.filter(project => project.domainName === domain);
          setFilteredProjects(filtered);
        } else {
          setFilteredProjects(response.data);
        }
        setLoading(false); // End loading
      } catch (error) {
        setError('Error fetching projects');
        setLoading(false); // End loading
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [domain]);

  return (
    <div className="projects-page">
      <header className="header">
        <h1>PROJECTS IN {domain || 'All Domains'}</h1>
      </header>
      <div className="projects-grid">
        {loading ? (
          Array(6).fill(null).map((_, index) => (
            <div className="project-card" key={index}>
              <Skeleton height={200} /> {/* Skeleton for the image */}
              <div className="project-info">
                <Skeleton width={100} height={20} /> {/* Skeleton for the domain */}
                <Skeleton width={200} height={30} /> {/* Skeleton for the project name */}
                <Skeleton count={3} /> {/* Skeleton for the description */}
              </div>
            </div>
          ))
        ) : error ? (
          <p>{error}</p> // Display error message
        ) : filteredProjects.length === 0 ? (
          <p>No projects found</p> // Handle empty project list
        ) : (
          filteredProjects.map((project) => (
            <div className="project-card" key={project._id}>
              <img 
                src={project.image} 
                alt={project.projectName} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
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
    </div>
  );
};

export default ProjectsPage;
