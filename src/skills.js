import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaJava, FaReact, FaNodeJs, FaDatabase, FaAws } from 'react-icons/fa';
import {  DiJavascript1, DiHtml5} from 'react-icons/di';
import './skills.css';


export default function Skills() {
  const progskills = [
    { name: 'C', icon:  <FaJava /> },
    { name: 'C++', icon:  <FaJava /> },
    { name: 'JAVA', icon: <FaJava /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'R', icon:  <FaJava /> },
    { name: 'Machine Learning', icon: <FaDatabase /> }
  ];

  const scrypting = [
    { name: 'JavaScript', icon: <DiJavascript1 /> },
    { name: 'React.Js', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'HTML & CSS', icon: <DiHtml5 /> },
    { name: 'Express.Js', icon: <FaNodeJs /> }
  ];

  const DataBases = [
    { name: 'MongoDB    ', icon: <FaDatabase/> },
    { name: 'SQL', icon: <FaDatabase /> },
    { name: 'Firebase', icon: <FaDatabase /> },
    { name: 'Airtable', icon: <FaDatabase /> },
    { name: 'HBase', icon: <FaDatabase /> },
    { name: 'AWS Console', icon: <FaAws /> }
  ];

  const cardAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  return (
    <div id='skills-section'>
        <h1 id='skillhead'>Skills & Technologies I Can</h1>
      
      <div className='skill-category'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          Programming Skills
        </motion.h1>
        <div className='card-container'>
          {progskills.map((skill, index) => (
            <motion.div
              key={index}
              className='skill-card'
              {...cardAnimation}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {skill.icon}
              <span>{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <hr/>
      <div className='skill-category'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          Scripting Skills
        </motion.h1>
        <div className='card-container'>
          {scrypting.map((skill, index) => (
            <motion.div
              key={index}
              className='skill-card'
              {...cardAnimation}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {skill.icon}
              <span>{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <hr/>
      
      <div className='skill-category'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          Databases
        </motion.h1>
        <div className='card-container'>
          {DataBases.map((skill, index) => (
            <motion.div
              key={index}
              className='skill-card'
              {...cardAnimation}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {skill.icon}
              <span>{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
