    import React, { useState } from 'react';
    import './Signup.css';

    const Signup = () => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      const [error, setError] = useState('');

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form ",formData);
        
        const { name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        try {
          
          const response = await fetch('http://localhost:3001/sure/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
          
          });
          console.log("Ressssss",response);

          if (response.ok) {
            alert('Signup successful!');
          } else {
            setError('Signup failed');
          }
        } catch (err) {
          setError('An error occurred');
        }
      };

      return (
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn primary">Sign Up</button>
          </form>
        </div>
      );
    };

    export default Signup;
