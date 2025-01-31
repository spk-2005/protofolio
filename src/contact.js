import React from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import './contact.css';  // Assuming you want to add styles

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-content">
        <h2>Get in Touch</h2>
        <p>If you have any questions or would like to get in touch, feel free to reach out via the following platforms:</p>
        
        <ol className="contact-list">
          <li>
            <a href="https://wa.me/8309179509" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp size={30} color="green" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/your-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={30} color="blue" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={30} color="#E4405F" />
            </a>
          </li>
          <li>
            <a href="mailto:prasannasimha5002@gmail.com" aria-label="Email">
              <FaEnvelope size={30} color="red" />
            </a>
          </li>
          <li>
            <a href="tel:8309179509" aria-label="Phone">
              <FaPhone size={30} color="black" />
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
