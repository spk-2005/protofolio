import React from 'react';
import i1 from './swas.jpg'; 
import './experience.css';
import i2 from './hack.jpg';
import i3 from './vvit.jpg';
export default function Experience() {
  return (
    <>
    <div id='exp-sec'>
    <h1>Experience</h1>
    <div id="experience-section">
      
      <div className="experience-card">
        <img src={i1} alt="RupaJna Contest" />
        <p>
          I participated in the RupaJna contest, which is a prototype innovation competition held nationwide, and we secured the second prize.
        </p>
      </div>

      <div className="experience-card">
        <img src={i2} alt="Hackathon Event" />
        <p>
          I attended a 24-hour Hackathon focused on web development.
        </p>
      </div>
      <div className="experience-card">
        <img src={i3} alt="Hackathon Event" />
        <p>
          I had participated in Escape Saga Contest which is based on coding regarding python,c languages which was conducted by VVIT.
        </p>
      </div>
      
    </div>
    </div>    </>
  );
}
