import React from 'react';
import i1 from './int1.jpg'; // Assuming this is the image for your experience
import './experience.css';

export default function Experience() {
  return (
    <div id="experience-section">
      <h1>Experience</h1>
      
      <div className="experience-card">
        <img src={i1} alt="RupaJna Contest" />
        <p>
          I participated in the RupaJna contest, which is a prototype innovation competition held nationwide, and we secured the second prize.
        </p>
      </div>

      <div className="experience-card">
        <img src={i1} alt="Hackathon Event" />
        <p>
          I attended a 24-hour Hackathon focused on web development.
        </p>
      </div>
    </div>
  );
}
