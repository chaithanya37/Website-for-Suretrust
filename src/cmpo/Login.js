import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import {jwtDecode} from 'jwt-decode';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/sure/login', {
        email,
        password,
      });
      setLoading(false);
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded); 

        setUser(decoded);
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign in</h2>
        <div className="input-group">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <div className="links">
          <a href="/signup">Not have an account? Sign up</a>
          <a href="/forgot-password">Forgotten password</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
