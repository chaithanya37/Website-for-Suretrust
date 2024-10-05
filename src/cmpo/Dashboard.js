import React from 'react';  
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import alumniImage from './alumni-034828ea.jpg';
import mentorshipImage from './mentor.jpg';
import jobsImage from './job.jpg';
import discussionsImage from './discussion.jpg';
import newsImage from './news.jpg';


const Dashboard = () => {
  const cards = [
    {
      title: 'Alumni Directory',
      description: 'Search for Alumni profiles for networking.',
      imageUrl: alumniImage,
    },
    {
      title: 'Mentorship',
      description: 'Get mentoring from alumni.',
      imageUrl: mentorshipImage,
      comingSoon: true,
    },
    {
      title: 'Jobs',
      description: 'Job notifications posted by alumni community.',
      imageUrl: jobsImage,
      comingSoon: true,
    },
    {
      title: 'Discussions',
      description: 'Discussions and knowledge sharing among community members.',
      imageUrl: discussionsImage,
    },
    {
      title: 'News',
      description: 'News and announcements relevant to alumni and students.',
      imageUrl: newsImage,
    },
  ];

  return (
    <div className="container1 mt-5">
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className="card1 h-100">
              <img src={card.imageUrl} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.description}</p>
                {card.comingSoon && (
                  <span className="badge bg-warning text-dark">Coming Soon</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
