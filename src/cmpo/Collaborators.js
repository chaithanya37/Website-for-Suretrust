import React from 'react';
import './Collaborators.css';

const Collaborators = () => {
  const collaborators = [
    'AstraZeneca',
    'Redapricot',
    'Check.in',
    'Lokibots',
    'Onusworks',
    'Digital Ocean',
    'TAFE',
    'TATA Group of Companies',
    'Atsuya Technologies',
  ];

  return (
    <div className="collaborators-page">
      <section className="collaborators-section">
        <h2>Collaborators</h2>
        <div className="collaborators-grid">
          {collaborators.map((name, index) => (
            <div className="collaborator-card" key={index}>
              {name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Collaborators;
