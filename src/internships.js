import React from 'react';
import './internshipd.css';
import image1 from './int1.jpg';
import image2 from './int2.jpg';
import image3 from './int3.jpg';
import image4 from './int4.jpg';

export default function Internships() {
  return (
    <section id="internships-section">
      <h2>My Internships & Certifications</h2>
      <div className="internship-container">
        <div className="internship-card">
          <img src={image1} alt="Internship 1" />
          <p>Problem Solving Through C at NPTEL</p>
        </div>
        <div className="internship-card">
          <img src={image2} alt="Internship 2" />
          <p>Joy Of Computing Using Python at NPTEL</p>
        </div>
        <div className="internship-card">
          <img src={image3} alt="Internship 3" />
          <p>Data Engineering Virtual Internship at AICTE</p>
        </div>
        <div className="internship-card">
          <img src={image4} alt="Internship 3" />
          <p>Induction To Industry 4.0 Industrial at NPTEL</p>
        </div>
      </div>
    </section>
  );
}
