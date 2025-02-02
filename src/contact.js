import React from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope, FaPhone,FaLinkedin } from "react-icons/fa";
import './contact.css';

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-content">
        <h2>Get in Touch</h2>
        <p>If you have any questions or would like to get in touch, feel free to reach out via the following platforms:</p>
        
        <ol className="contact-list">
          <li>
            <a href="https://wa.me/8309179509" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp size={30} color="green" id='icon'/>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/your-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={30} color="blue" id='icon'/>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={30} color="#E4405F" id='icon' />
            </a>
          </li>
          <li>
            <a href="mailto:prasannasimha5002@gmail.com" aria-label="Email">
              <FaEnvelope size={30} color="red" id='icon'/>
            </a>
          </li>
          <li>
            <a href="tel:8309179509" aria-label="Phone">
              <FaPhone size={30} color="black"id='icon' />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/prasanna-kumar-simhadri-32aa80290/?trk=opento_sprofile_details" aria-label="Phone">
              <FaLinkedin size={30} color="rgb(0, 128, 255)" id='icon'/>
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
