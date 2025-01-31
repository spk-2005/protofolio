import React from 'react';
import './internshipd.css';
import image1 from './int1.jpg';
import image2 from './int2.jpg';
import image3 from './int3.jpg';
import image4 from './int4.jpg';

export default function Internships() {
  return (
    <section id="internships-section">
      <h2>My Internships</h2>
      <div className="internship-container">
        <div className="internship-card">
          <img src={image1} alt="Internship 1" />
          <p>Web Development Internship at XYZ Company</p>
        </div>
        <div className="internship-card">
          <img src={image2} alt="Internship 2" />
          <p>Data Science Internship at ABC Solutions</p>
        </div>
        <div className="internship-card">
          <img src={image3} alt="Internship 3" />
          <p>Software Engineering Internship at 123 Technologies</p>
        </div>
        <div className="internship-card">
          <img src={image4} alt="Internship 3" />
          <p>Software Engineering Internship at 123 Technologies</p>
        </div>
      </div>
    </section>
  );
}
