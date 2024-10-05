import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './cmpo/Login';
import Signup from './cmpo/Signup';
import UploadProject from './cmpo/UploadProject';
import DomainsPage from './cmpo/DomainsPage';
import ProjectsPage from './cmpo/ProjectsPage';
import CourseDetails from './cmpo/CourseDetails';
import CoursesGrid from './cmpo/CoursesGrid';
import CreateCourse from './cmpo/CreateCourse';
import Dashboard from './cmpo/Dashboard';
import Courses from './cmpo/Courses';
import RegisterCourse from './cmpo/RegisterCourse';
import Header from './cmpo/Header'; // Import the Header component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/uploadprojects" element={<UploadProject />} />
        <Route path="/intern" element={<DomainsPage />} />
        <Route path="/projects/:domain" element={<ProjectsPage />} />
        <Route path="/courses" element={<CoursesGrid />} />
        <Route path="/courseDetails/:name" element={<CourseDetails />} />
        <Route path="/create/course" element={<CreateCourse />} />
        <Route path="/alumni" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/register/:id" element={<RegisterCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
