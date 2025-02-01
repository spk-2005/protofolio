import React from 'react';
import { motion } from 'framer-motion';
import Achievements from './achivements';
import Projects from './projects';
import Internships from './internships';
import Whatsapp from './whatsaap';
import './home.css';

export default function Home() {
  return (
    <div id='home-section'>
      {/* Name Heading with Fade-in & Slide-down Effect */}
      <motion.h1 
        id='myname'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 ,duration:.3}}
        transition={{ duration: .6, ease: 'easeInOut' }}
      >
        Hi, I'm Prasanna Kumar, a passionate Data Science & Web Developer
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, x:0,y:0 }}
        animate={{ opacity: 1, x:0,y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}

      >
        <Whatsapp />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
      >
        <Achievements />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
      >
        <Projects />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
      >
        <Internships />
      </motion.div>
    </div>
  );
}
