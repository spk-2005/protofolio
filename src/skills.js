import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPython, 
  FaJava, 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaAws, 
  FaHtml5, 
  FaCss3Alt, 
  FaBootstrap, 
  FaGitAlt, 
  FaNpm, 
  FaDocker,
  FaServer,
  FaCode,
  FaBrain,
  FaJs,
  FaRProject,
  FaCloud,
  FaGoogle,
  FaMicrosoft,
  FaCuttlefish,
  FaPlus
} from 'react-icons/fa';
import {
  DiMongodb, 
  DiMysql,
  DiFirebase,
  DiJqueryLogo,
  DiSass,
  DiCss3,
  DiCode,
  DiHaskell,
  DiPostgresql,
  DiPython,
  DiReact
} from 'react-icons/di';
import { 
  AiFillApi,
  AiFillCode
} from 'react-icons/ai';
import { 
  GrGraphQl
} from 'react-icons/gr';
import './skills.css';

export default function Skills() {
  // Programming Languages
  const programmingLanguages = [
    { name: 'C', icon: <FaCuttlefish /> },
    { name: 'C++', icon: <><FaCuttlefish /><FaPlus /></> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'TypeScript', icon: <AiFillCode /> },
    { name: 'R', icon: <FaRProject /> },
    { name: 'Haskell', icon: <DiHaskell /> }
  ];

  // Web Development
  const webDevelopment = [
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3Alt /> },
    { name: 'Sass', icon: <DiSass /> },
    { name: 'jQuery', icon: <DiJqueryLogo /> },
    { name: 'React.js', icon: <FaReact /> },
    { name: 'Next.js', icon: <DiReact /> },
    { name: 'Redux', icon: <AiFillCode /> },
    { name: 'Material UI', icon: <FaCode /> },
    { name: 'Tailwind CSS', icon: <DiCss3 /> },
    { name: 'Bootstrap', icon: <FaBootstrap /> }
  ];

  // Backend Development
  const backendDevelopment = [
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Express.js', icon: <AiFillApi /> },
    { name: 'GraphQL', icon: <GrGraphQl /> },
    { name: 'RESTful APIs', icon: <FaServer /> }
  ];

  // AI & Machine Learning
  const aiAndMachineLearning = [
    { name: 'Machine Learning', icon: <FaBrain /> },
    { name: 'Deep Learning', icon: <FaBrain /> },
    { name: 'TensorFlow', icon: <DiPython /> },
    { name: 'PyTorch', icon: <DiPython /> },
    { name: 'Keras', icon: <DiPython /> },
    { name: 'Natural Language Processing', icon: <FaCode /> },
    { name: 'Computer Vision', icon: <DiCode /> }
  ];

  // Databases
  const databases = [
    { name: 'MongoDB', icon: <DiMongodb /> },
    { name: 'SQL', icon: <DiMysql /> },
    { name: 'PostgreSQL', icon: <DiPostgresql /> },
    { name: 'Firebase', icon: <DiFirebase /> },
    { name: 'HBase', icon: <FaDatabase /> },
    { name: 'Airtable', icon: <FaDatabase /> }
  ];

  // Cloud & DevOps
  const cloudAndDevOps = [
    { name: 'AWS', icon: <FaAws /> },
    { name: 'Google Cloud', icon: <FaGoogle /> },
    { name: 'Azure', icon: <FaMicrosoft /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'NPM', icon: <FaNpm /> },
    { name: 'Hadoop', icon: <FaCloud /> }
  ];

  const cardAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  const renderSkillCategory = (title, skills) => (
    <>
      <div className='skill-category'>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {title}
        </motion.h2>
        <div className='card-container'>
          {skills.map((skill, index) => (
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
      <hr />
    </>
  );

  return (
    <div id='skills-section'>
      <h1 id='skillhead'>Skills & Technologies</h1>
      
      {renderSkillCategory('Programming Languages', programmingLanguages)}
      {renderSkillCategory('Web Development', webDevelopment)}
      {renderSkillCategory('Backend Development', backendDevelopment)}
      {renderSkillCategory('AI & Machine Learning', aiAndMachineLearning)}
      {renderSkillCategory('Databases', databases)}
      {renderSkillCategory('Cloud & DevOps', cloudAndDevOps)}
    </div>
  );
}