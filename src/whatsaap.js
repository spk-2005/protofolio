import React, { useState } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import './whatsapp.css';
import chat from './chat.png';
const WhatsAppChat = () => {
  const [showIcons, setShowIcons] = useState(false);

  const handleClick = () => {
    setShowIcons(!showIcons);
  };

  return (
    <div id="chaticon">
      {!showIcons && (
        <button className="chat-button"  onClick={handleClick} title="Chat With Me">
         <img src={chat} alt=""id="chat-icon"/>
        </button>
      )}

      {showIcons && (
        <button className="chat-button close-button" onClick={handleClick}>
          <ion-icon name="close-outline"></ion-icon>
        </button>
      )}

      {showIcons && (
        <ol className="chat-icons">
          <li>
            <a href="https://wa.me/8309179509" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={30} color="green" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/profile.php?id=100083873681403" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} color="blue" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/prasanna_kumar_simmhadri_2005/?hl=en" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} color="#E4405F" />
            </a>
          </li>
          <li>
            <a href="mailto:prasannasimha5002@gmail.com">
              <FaEnvelope size={30} color="red" />
            </a>
          </li>
          <li>
            <a href="tel:8309179509">
              <FaPhone size={30} color="black" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/prasanna-kumar-simhadri-32aa80290/?trk=opento_sprofile_details">
              <FaLinkedin size={30} color="rgb(0, 128, 255)" />
            </a>
          </li>
        </ol>
      )}
    </div>
  );
};

export default WhatsAppChat;
