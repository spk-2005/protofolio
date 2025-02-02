import React, { useEffect, useState } from 'react';
import './achivements.css';
import im2 from './WhatsApp Image 2024-11-16 at 20.26.24_399e12a3.jpg';
import im1 from './WhatsApp Image 2024-11-16 at 21.07.51_a2787521.c19f1c5b2330f87bf84a.jpg';

export default function Achivements() {
    const images = [im1, im2];
    const titles = [`Won second place in the national-level prototype challenge "Rupajna", organized by the ITBI Center under RJE-NEST and held at RVRJC College! 🏆`, `Won second place in the national-level prototype challenge "Rupajna", organized by the ITBI Center under RJE-NEST and held at RVRJC College! 🏆`];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div id='avhivement-section'>
            <h1>My Achievements</h1>
            <div className="image-container">
                <img src={images[index]} alt="Achievement" />
                <div className="title-overlay">{titles[index]}</div>
            </div>
        </div>
    );
}
