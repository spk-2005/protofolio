import React from 'react';
import { motion } from 'framer-motion';
import Achievements from './achivements';
import Projects from './projects';
import Internships from './internships';
import './home.css';
import Viewresume from './viewresume';
import Skills from './skills';
import Experience from './experience';
import Contact from './contact';

export default function Home() {
  return (
    <div id='home-section'>
      <motion.h1 
  id='my-name'
  initial={{ opacity: 0, y: -10, scale: 0.8, rotateX: 90 }} 
  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} 
  transition={{ duration: 0.15, ease: 'easeInOut' }}
>
  Hi, I'm Prasanna Kumar, a passionate Data Science & Web Developer
  <br/>
  <span id='namdet'> React Developer | MERN Stack | Data Science | Web Developer</span>
</motion.h1>



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
      ><hr/>
        <Projects />
      </motion.div>
<hr/>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
      >
        <Internships />
      </motion.div><hr/>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
      >
        <Skills />
      </motion.div>
      <hr/>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
      >
        <Experience />
      </motion.div> <hr/>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
      >
        <Contact />
      </motion.div></div>
  );
}
