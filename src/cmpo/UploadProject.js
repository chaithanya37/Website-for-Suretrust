import React, { useState } from 'react';
import axios from 'axios';
import './UploadProject.css'; 

const UploadProject = () => {
  const [projectName, setProjectName] = useState('');
  const [domainName, setDomainName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('domainName', domainName);
    formData.append('ownerName', ownerName);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:3001/sure/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage(response.data.message);

      setProjectName('');
      setDomainName('');
      setOwnerName('');
      setDescription('');
      setImage(null);
    } catch (err) {
      console.error('Error uploading project:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="upload-project-container">
      <form onSubmit={handleSubmit} className="upload-project-form">
        <h2>Upload Project</h2>
        
        <div className="input-group">
          <label>Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label>Domain Name</label>
          <input
            type="text"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label>Owner Name</label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        
        <button type="submit" className="btn">Upload Project</button>
      </form>
    </div>
  );
};

export default UploadProject;
