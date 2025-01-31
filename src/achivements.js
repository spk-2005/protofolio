import React, { useEffect, useState } from 'react'
import './achivements.css';
import im2 from './WhatsApp Image 2024-11-16 at 20.26.24_399e12a3.jpg'
import im1 from './WhatsApp Image 2024-11-16 at 21.07.51_a2787521.c19f1c5b2330f87bf84a.jpg'
export default function Achivements() {
    const images=[im1,im2];
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const intervel=setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return()=>clearInterval(intervel)
    },[images.length])
    
    return (
    <div id='avhivement-section'>
      <h1>My Achivements</h1>
      <img src={images[index]} alt=''/>
    </div>
  )
}
