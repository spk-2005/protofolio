import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown, ArrowRight, MapPin, Calendar, Code2, User, Phone, Heart, Camera, Music, Zap, Database, Globe, Smartphone, Settings, Terminal, FileCode, Layers, Cloud, Monitor, Wrench, Cpu, Server, Palette, Layout } from 'lucide-react';


import chatbot from './project_assets/chatbot.png';
import online from './project_assets/Admin Panel - Google Chrome 15-07-2025 07_13_26.png';
import spkhub from './project_assets/spkhub.png';
import swasthik from './project_assets/React App - Google Chrome 27-01-2025 19_02_07.png'

const Portfolio3D = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);

  const sectionsRef = useRef({});

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01
        });
      }
      setStars(newStars);
    };

    generateStars();
    window.addEventListener('resize', generateStars);
    return () => window.removeEventListener('resize', generateStars);
  }, []);

  // Animate stars
  useEffect(() => {
    const animateStars = () => {
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          x: (star.x - star.speed + window.innerWidth) % window.innerWidth,
          opacity: star.opacity + Math.sin(Date.now() * star.twinkleSpeed) * 0.3
        }))
      );
    };

    const interval = setInterval(animateStars, 50);
    return () => clearInterval(interval);
  }, []);

  // Handle mouse movement for cursor effect and galaxy interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create ripple effect on galaxy background
      const ripple = document.createElement('div');
      ripple.className = 'galaxy-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      id: 1,
      title: "ChatBot for College",
      description: `Developed and deployed a custom NLP-based Chatbot. The chatbot is fully responsive across mobile and desktop devices, ensuring a smooth user experience everywhere. Handled conditional rendering, responsive layouts, and PDF export features.`,
      tech: ["React", "Node.js", "NLP"],
      image: chatbot,
      github1: "https://github.com/spk-2005/rvrbot",
      github2: "https://github.com/spk-2005/rvrjcbot-backend",
      live: "https://rvrbot.netlify.app/",
      featured: true,
      category: "AI/ML"
    },
    {
      id: 2,
      title: "ONLINE EXAMINATION SYSTEM",
      description: `Developed and deployed an Online mock test web app with secure login and quiz functionality. Integrated MongoDB for dynamic data storage, including tests, users, and responses. Handled conditional rendering, responsive layouts, and PDF export features.`,
      tech: ["Next.js", "MongoDB"],
      image:online,
      github1: "https://github.com/spk-2005/online-exam-departmental-test",
      github2: "#",
      live: "https://departmental-tests.netlify.app/",
      featured: true,
      category: "Web App"
    },
    {
      id: 3,
      title: "SPK-HUB",
      description: `Developed and deployed a platform for real-time updates on current events, history, mysteries, and lifestyle topics. The site is fully responsive across mobile and desktop devices with Image to PDF and Text to PDF Converters and SEO Optimization.`,
      tech: ["React", "Express", "MongoDB"],
      image: spkhub,
      github1: "https://github.com/spk-2005/SPKHUB-FRONTEND",
      github2: "https://github.com/spk-2005/SPKHUB-backend",
      live: "https://spkhub.netlify.app/",
      featured: false,
      category: "Content Platform"
    },
    {
      id: 4,
      title: "SSEM School Website",
      description: `A custom prototype website for a school, designed to offer a clean, engaging, and informative experience for students, parents, and staff. Features modern design patterns and responsive layouts.`,
      tech: ["React", "Express", "MongoDB"],
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&h=300&fit=crop",
      github1: "https://github.com/spk-2005/ssem",
      github2: "#",
      live: "https://ssem2007.netlify.app/",
      featured: false,
      category: "Educational"
    },
    {
      id: 5,
      title: "KRUSHI KALPA",
      description: `KRUSHI KALPA – Bridging Farmers & Consumers. A web application designed to empower farmers and connect them directly with consumers! Part of RUPAJNA 2025 – Intra-College Prototype Competition, revolutionizing agriculture through technology.`,
      tech: ["React", "Express", "MongoDB"],
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop",
      github1: "https://github.com/spk-2005/krushikalpa",
      github2: "#",
      live: "",
      featured: false,
      category: "Agriculture Tech"
    },
    {
      id: 6,
      title: "SWASTIK",
      description: `SWASTIK: A Visionary Prototype for Social Impact. Our prototype web application designed to tackle pressing social issues through collective action and innovation. Engages communities across four impactful categories.`,
      tech: ["React", "Express", "MongoDB"],
      image:swasthik,     
      github1: "#",
      github2: "#",
      live: "",
      featured: false,
      category: "Social Impact"
    }
  ];

  const experience = [
    {
      role: "SDE Intern",
      company: "Bluestock™🔺",
      period: "Apr 2025 - Jun 2025 · 3 mos",
      location: "Remote",
      description: "📌 Not only did I gain hands-on experience in full stack development, but I was also honored to take on the role of Team Lead during the journey. Leading a passionate, talented team and contributing to impactful fintech solutions has been an incredible experience! 🙌🛠️.",
      technologies: ["React", "Node.js", "FireBase", "MongoDB"]
    },
  ];

  const skillCategories = [
    {
      category: "Frontend",
      icon: <Monitor className="w-6 h-6" />,
      skills: [
        { name: "React.js", icon: <FileCode className="w-4 h-4" /> },
        { name: "Next.js", icon: <Layers className="w-4 h-4" /> },
        { name: "JavaScript (ES6+)", icon: <Code2 className="w-4 h-4" /> },
        { name: "HTML5", icon: <Layout className="w-4 h-4" /> },
        { name: "CSS3", icon: <Palette className="w-4 h-4" /> },
        { name: "Tailwind CSS", icon: <Wrench className="w-4 h-4" /> }
      ],
      color: "from-cyan-400 to-blue-500",
      delay: 0
    },
    {
      category: "Backend", 
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: "Node.js", icon: <Cpu className="w-4 h-4" /> },
        { name: "Express.js", icon: <Terminal className="w-4 h-4" /> },
        { name: "REST APIs", icon: <Globe className="w-4 h-4" /> }
      ],
      color: "from-purple-400 to-pink-500",
      delay: 0.2
    },
    {
      category: "Database",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "MongoDB Atlas", icon: <Database className="w-4 h-4" /> },
        { name: "Airtable", icon: <Layers className="w-4 h-4" /> },
        { name: "Firebase", icon: <Zap className="w-4 h-4" /> },
        { name: "MySql", icon: <Server className="w-4 h-4" /> }
      ],
      color: "from-green-400 to-emerald-500",
      delay: 0.4
    },
    {
      category: "Cloud & Deployment",
      icon: <Cloud className="w-6 h-6" />,
      skills: [
        { name: "Render", icon: <Cloud className="w-4 h-4" /> },
        { name: "Netlify", icon: <Globe className="w-4 h-4" /> },
        { name: "Vercel", icon: <Zap className="w-4 h-4" /> }
      ],
      color: "from-yellow-400 to-orange-500",
      delay: 0.6
    },
    {
      category: "Tools",
      icon: <Settings className="w-6 h-6" />,
      skills: [
        { name: "Git & GitHub", icon: <Github className="w-4 h-4" /> },
        { name: "VS Code", icon: <Code2 className="w-4 h-4" /> }
      ],
      color: "from-indigo-400 to-purple-500",
      delay: 0.8
    },
    {
      category: "App Development",
      icon: <Smartphone className="w-6 h-6" />,
      skills: [
        { name: "React Native", icon: <Smartphone className="w-4 h-4" /> }
      ],
      color: "from-pink-400 to-red-500",
      delay: 1.0
    }
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-pink-400 border-l-blue-400 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <div className="text-cyan-400 text-sm tracking-widest font-light">INITIALIZING GALAXY</div>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="galaxy-container text-white min-h-screen relative overflow-x-hidden">
      {/* Galaxy Background */}
      <div className="galaxy-bg fixed inset-0 z-0">
        {/* Animated Stars */}
        {stars.map(star => (
          <div
            key={star.id}
            className="star absolute rounded-full"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: Math.max(0.1, Math.min(1, star.opacity)),
              background: `radial-gradient(circle, ${
                star.size > 2 ? '#ffffff' : star.size > 1.5 ? '#ffffff' : '#ffffff'
              }, transparent)`,
              boxShadow: `0 0 ${star.size * 2}px ${
                star.size > 2 ? '#9a9a9a' : star.size > 1.5 ? '#909092' : '#aaaaaa'
              }`,
            }}
          />
        ))}
      </div>

      {/* Custom Cursor */}
      <div 
        className="custom-cursor fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x - 15,
          top: mousePosition.y - 15,
          transform: `scale(${isMenuOpen ? 1.5 : 1})`
        }}
      >
        <div className="cursor-inner">
          <div className="cursor-glow"></div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-lg bg-black/20 border-b border-cyan-500/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="text-xl font-light tracking-widest cursor-pointer text-cyan-400 hover:text-white transition-all duration-300 hover:drop-shadow-lg"
              onClick={() => scrollToSection('home')}
            >
              SIMHADRI PRASANNA KUMAR
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'skills', 'Projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm tracking-widest uppercase transition-all duration-300 hover:drop-shadow-lg ${
                    activeSection === section 
                      ? 'text-cyan-400 drop-shadow-lg' 
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-cyan-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full backdrop-blur-lg bg-black/40 border-b border-cyan-500/30">
            <div className="flex flex-col space-y-4 p-6">
              {['home', 'about', 'skills', 'Projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-left text-sm tracking-widest uppercase text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={(el) => sectionsRef.current.home = el}
        className="min-h-screen flex items-center justify-center relative px-6"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-tight text-glow">
              <span className="block overflow-hidden">
                <span className="block transition-transform duration-1000 translate-y-0 animate-fade-in-up text-gradient">
                  PRASANNA KUMAR
                </span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-cyan-300 mb-8 transition-opacity duration-1000 delay-400 opacity-100 animate-fade-in">
              Full Stack Developer & Creative Technologist
            </p>
            
            <div className="flex items-center justify-center space-x-6 transition-opacity duration-1000 delay-600 opacity-100 animate-fade-in">
              <a href="https://github.com/spk-2005" className="social-link">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/prasanna-kumar-simhadri-32aa80290/" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="mailto:prasannasimha5002@gmail.com" className="social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="animate-bounce text-cyan-400 glow-pulse" size={24} />
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={(el) => sectionsRef.current.about = el}
        className="min-h-screen flex items-center px-6 py-20 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8 opacity-100 animate-fade-in text-gradient">
                About Me
              </h2>
              
              <div className="space-y-6 text-gray-200 text-lg leading-relaxed opacity-100 animate-fade-in">
                <p>
                  I'm a passionate full-stack developer with over 2 years of experience building 
                  scalable web applications and innovative digital solutions. I love turning 
                  complex problems into simple, beautiful designs.
                </p>
                
                <p>
                  My expertise spans modern JavaScript frameworks and 
                  database design. I believe in writing clean, maintainable code and creating 
                  exceptional user experiences.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing 
                  to open source projects, or enjoying a good cup of coffee while reading about 
                  the latest in web development.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4 opacity-100 animate-fade-in">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <MapPin size={16} />
                  <span>Andhra Pradesh, India</span>
                </div>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Calendar size={16} />
                  <span>Available for work</span>
                </div>
              </div>
            </div>
            
            <div className="opacity-100 animate-fade-in">
              <div className="glass-card p-8 rounded-lg">
                <div className="text-center mb-8">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-spin-slow opacity-75"></div>
                    <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                      <User size={48} className="text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-light text-gradient mb-2">Full Stack Developer</h3>
                  <p className="text-gray-400 text-sm">Crafting digital experiences</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Projects Completed</span>
                    <span className="text-cyan-400 font-bold">10+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Years Experience</span>
                    <span className="text-purple-400 font-bold">2+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Technologies Mastered</span>
                    <span className="text-pink-400 font-bold">10+</span>
                  </div>
                </div>
              </div>
              
              {/* Personal Interests */}
              <div className="mt-8 glass-card p-6 rounded-lg">
                <h3 className="text-sm font-medium text-cyan-400 mb-4 tracking-widest uppercase">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: <Camera size={16} />, label: "Movies" },
                    { icon: <Music size={16} />, label: "Music" }
                  ].map((interest) => (
                    <div key={interest.label} className="flex items-center space-x-2 text-gray-300 hover:text-cyan-300 transition-colors">
                      {interest.icon}
                      <span className="text-sm">{interest.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={(el) => sectionsRef.current.skills = el}
        className="min-h-screen px-6 py-20 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-8 opacity-100 animate-fade-in text-gradient">
              Skills & Expertise
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto opacity-100 animate-fade-in">
              Mastering the technologies that power the modern web
            </p>
          </div>
          
          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div 
                key={category.category}
                className="skill-card opacity-100 animate-fade-in relative overflow-hidden"
                style={{animationDelay: `${category.delay}s`}}
              >
                <div className="glass-card p-6 rounded-lg h-full relative group">
                  {/* Racing light effect */}
                  <div className="racing-border"></div>
                  
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} glow-pulse`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-medium text-gradient">{category.category}</h3>
                  </div>
                  
                  {/* Skills List with Icons */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skill.name}
                        className="skill-item flex items-center space-x-3 opacity-100 animate-fade-in hover:bg-white/5 p-2 rounded-lg transition-all duration-300"
                        style={{animationDelay: `${category.delay + skillIndex * 0.1}s`}}
                      >
                        <div className="skill-icon p-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded">
                          {skill.icon}
                        </div>
                        <span className="text-gray-200 hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Proficiency Bar */}
                  <div className="mt-6">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${category.color} racing-progress rounded-full`}
                        style={{animationDelay: `${category.delay + 0.5}s`}}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Floating Particles */}
                  <div className="skill-particles">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i}
                        className="skill-particle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${3 + Math.random() * 2}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Skills Summary */}
          <div className="mt-16 text-center opacity-100 animate-fade-in">
            <div className="glass-card p-8 rounded-lg inline-block">
              <h3 className="text-2xl font-light text-gradient mb-4">Ready to Build Amazing Things</h3>
              <p className="text-gray-300 mb-6">
                With a comprehensive skill set spanning frontend, backend, and deployment technologies,
                I'm equipped to bring your digital vision to life.
              </p>
              <button 
                onClick={() => scrollToSection('Projects')}
                className="skill-cta-button"
              >
                <span>View My Projects</span>
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="Projects" 
        ref={(el) => sectionsRef.current.Projects = el}
        className="min-h-screen px-6 py-20 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-center opacity-100 animate-fade-in text-gradient">
            My Projects
          </h2>
          
          <div className="space-y-32">
            {projects.map((project, index) => (
              <div key={project.id} className="relative">
                {/* Project Separator Line */}
                {index > 0 && (
                  <div className="absolute -top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent">
                    <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-12 items-center opacity-100 animate-fade-in project-container">
                  {/* Project Image */}
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="relative group overflow-hidden rounded-lg glass-card project-image-container">
                      {/* Project Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-400/80 to-purple-400/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                      
                      {/* Project Number */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">
                          {String(project.id).padStart(2, '0')}
                        </div>
                      </div>
                      
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        {project.live && (
                          <a 
                            href={project.live}
                            className="project-btn"
                            aria-label="View Live Demo"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                      
                      {/* Project Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 blur-xl"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''} project-details`}>
                    <div className="space-y-6">
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-xs tracking-widest uppercase text-cyan-400 glow-pulse">Featured Project</span>
                        </div>
                      )}
                      
                      {/* Project Title */}
                      <h3 className="text-2xl md:text-3xl font-light text-gradient project-title">
                        {project.title}
                      </h3>
                      
                      {/* Project Description */}
                      <div className="glass-card p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
                        <p className="text-gray-200 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      
                      {/* Technologies Used */}
                      <div className="space-y-3">
                        <h4 className="text-sm tracking-widest uppercase text-cyan-400">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span 
                              key={tech}
                              className="tech-tag hover:scale-105 transition-transform duration-200"
                              style={{ animationDelay: `${techIndex * 0.1}s` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Project Links */}
                      <div className="flex space-x-6 pt-4">

                        <a 
                          href={project.github1}
                          className="project-link group"
                          aria-label="View source code"
                        >
                          <Github size={16} />
                          <span className="text-sm">Frontend  Code</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                        </a>
                        <a 
                          href={project.github2}
                          className="project-link group"
                          aria-label="View source code"
                        >
                          <Github size={16} />
                          <span className="text-sm">Backend Code</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                        </a>
                        {project.live && (
                          <a 
                            href={project.live}
                            className="project-link group"
                            aria-label="View live demo"
                          >
                            <ExternalLink size={16} />
                            <span className="text-sm">Live Demo</span>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Project Background Decoration */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5 rounded-3xl -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        id="experience" 
        ref={(el) => sectionsRef.current.experience = el}
        className="min-h-screen px-6 py-20 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-center opacity-100 animate-fade-in text-gradient">
            Experience
          </h2>
          
          <div className="space-y-12">
            {experience.map((job, index) => (
              <div 
                key={job.company}
                className="border-l-2 border-cyan-500/50 pl-8 pb-12 opacity-100 animate-fade-in"
              >
                <div className="relative -ml-10 mb-4">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full glow-pulse"></div>
                </div>
                
                <div className="space-y-3 glass-card p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl font-medium text-gradient">{job.role}</h3>
                    <span className="text-sm text-cyan-400 tracking-widest">{job.period}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-300">
                    <span>{job.company}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-200 leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="tech-tag-small"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Education */}
          <div className="mt-16 border-l-2 border-cyan-500/50 pl-8 opacity-100 animate-fade-in">
            <div className="relative -ml-10 mb-4">
              <div className="w-4 h-4 bg-cyan-400 rounded-full glow-pulse"></div>
            </div>
            
            <div className="space-y-3 glass-card p-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className="text-xl font-medium text-gradient">B.Tech Data Science</h3>
                <span className="text-sm text-cyan-400 tracking-widest">2022 - 2026</span>
              </div>
              
              <p className="text-gray-200 leading-relaxed">
                Focused on Software Engineering and Web Development. Participated in various coding competitions and open source projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={(el) => sectionsRef.current.contact = el}
        className="min-h-screen flex items-center px-6 py-20 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8 opacity-100 animate-fade-in text-gradient">
            Let's Work Together
          </h2>
          
          <p className="text-lg text-gray-200 mb-12 opacity-100 animate-fade-in">
            I'm always interested in hearing about new opportunities and exciting projects.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12 opacity-100 animate-fade-in">
            <a 
              href="mailto:prasannasimha5002@gmail.com"
              className="contact-link"
            >
              <Mail size={20} />
              <span>prasannasimha5002@gmail.com</span>
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a 
              href="tel:+918309179509"
              className="contact-link"
            >
              <Phone size={20} />
              <span>+91 8309179509</span>
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-12 opacity-100 animate-fade-in">
            <a href="https://github.com/spk-2005" className="social-icon">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/prasanna-kumar-simhadri-32aa80290/" className="social-icon">
              <Linkedin size={24} />
            </a>
            <a href="mailto:prasannasimha5002@gmail.com" className="social-icon">
              <Mail size={24} />
            </a>
          </div>
          
          <div className="text-gray-400 text-sm opacity-100 animate-fade-in">
            Made with <Heart size={14} className="inline mx-1 text-red-500 animate-pulse" /> in the Galaxy
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .galaxy-container {
          background: radial-gradient(ellipse at top, #06060a 0%, #000000 50%, #0a0d0f 100%);
          position: relative;
        }

        .custom-cursor {
          width: 30px;
          height: 30px;
          transition: transform 0.1s ease;
        }

        .cursor-inner {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-inner::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background: linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6);
          border-radius: 50%;
          animation: cursor-pulse 2s ease-in-out infinite;
        }

        .cursor-inner::after {
          content: '';
          position: absolute;
          width: 30px;
          height: 30px;
          border: 2px solid rgba(96, 165, 250, 0.3);
          border-radius: 50%;
          animation: cursor-rotate 3s linear infinite;
        }

        .cursor-glow {
          position: absolute;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: cursor-glow 1.5s ease-in-out infinite alternate;
        }

        @keyframes cursor-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.7; }
        }

        @keyframes cursor-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes cursor-glow {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.2); opacity: 0.1; }
        }

        .galaxy-ripple {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: ripple 1s ease-out;
          pointer-events: none;
        }

        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }

        .text-gradient {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-glow {
          filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.5));
        }

        .glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite alternate;
        }

        @keyframes glow-pulse {
          0% { 
            filter: drop-shadow(0 0 5px currentColor); 
            opacity: 1; 
          }
          100% { 
            filter: drop-shadow(0 0 20px currentColor); 
            opacity: 0.8; 
          }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(96, 165, 250, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(96, 165, 250, 0.1);
        }

        .social-link {
          color: #9ca3af;
          transition: all 0.3s ease;
          padding: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          color: #60a5fa;
          background: rgba(96, 165, 250, 0.1);
          border-color: rgba(96, 165, 250, 0.3);
          transform: translateY(-2px) scale(1.1);
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
        }

        .social-icon {
          padding: 16px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #9ca3af;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .social-icon:hover {
          color: #60a5fa;
          border-color: rgba(96, 165, 250, 0.5);
          background: rgba(96, 165, 250, 0.1);
          transform: translateY(-3px) rotate(5deg);
          box-shadow: 0 10px 25px rgba(96, 165, 250, 0.2);
        }

        .project-btn {
          padding: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          color: white;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .project-btn:hover {
          background: rgba(96, 165, 250, 0.2);
          border-color: rgba(96, 165, 250, 0.5);
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(96, 165, 250, 0.3);
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #9ca3af;
          transition: all 0.3s ease;
          padding: 8px 0;
        }

        .project-link:hover {
          color: #60a5fa;
          transform: translateX(5px);
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #d1d5db;
          transition: all 0.3s ease;
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          group: true;
        }

        .contact-link:hover {
          color: #60a5fa;
          background: rgba(96, 165, 250, 0.1);
          border-color: rgba(96, 165, 250, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(96, 165, 250, 0.15);
        }

        .tech-tag {
          padding: 6px 12px;
          background: rgba(96, 165, 250, 0.1);
          color: #60a5fa;
          font-size: 0.875rem;
          border-radius: 20px;
          border: 1px solid rgba(96, 165, 250, 0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .tech-tag:hover {
          background: rgba(96, 165, 250, 0.2);
          border-color: rgba(96, 165, 250, 0.4);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2);
        }

        .tech-tag-small {
          padding: 4px 8px;
          background: rgba(167, 139, 246, 0.1);
          color: #a78bfa;
          font-size: 0.75rem;
          border-radius: 12px;
          border: 1px solid rgba(167, 139, 246, 0.2);
        }

        /* Skills Section Enhancements */
        .skill-card {
          transition: all 0.5s ease;
        }

        .skill-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .racing-border {
          position: absolute;
          inset: -1px;
          padding: 1px;
          background: linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6, #60a5fa);
          background-size: 400% 400%;
          border-radius: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: racing-border 3s ease infinite;
        }

        .skill-card:hover .racing-border {
          opacity: 1;
        }

        @keyframes racing-border {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .racing-progress {
          width: 0%;
          animation: racing-progress 2s ease-out forwards;
        }

        @keyframes racing-progress {
          to { width: 85%; }
        }

        .skill-icon {
          color: #60a5fa;
          transition: all 0.3s ease;
        }

        .skill-item:hover .skill-icon {
          color: #ffffff;
          transform: scale(1.1);
        }

        .skill-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-card:hover .skill-particles {
          opacity: 1;
        }

        .skill-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #60a5fa, transparent);
          border-radius: 50%;
          animation: skill-particle-float linear infinite;
        }

        @keyframes skill-particle-float {
          0% {
            transform: translateY(100%) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100%) scale(0);
            opacity: 0;
          }
        }

        .skill-cta-button {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          background: linear-gradient(45deg, #60a5fa, #a78bfa);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .skill-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(96, 165, 250, 0.4);
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        }

        /* Project Section Enhancements */
        .project-container {
          position: relative;
          transition: all 0.5s ease;
        }

        .project-container:hover {
          transform: translateY(-5px);
        }

        .project-image-container {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }

        .project-image-container::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6);
          border-radius: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .project-container:hover .project-image-container::before {
          opacity: 0.3;
        }

        .project-title {
          transition: all 0.3s ease;
        }

        .project-container:hover .project-title {
          transform: translateX(10px);
        }

        .project-details {
          position: relative;
        }

        .project-details::before {
          content: '';
          position: absolute;
          left: -20px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, #60a5fa, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-container:hover .project-details::before {
          opacity: 1;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Ensure text is visible by default */
        h1, h2, h3, p, div {
          opacity: 1;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #60a5fa, #a78bfa);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        }

        /* Disable default cursor */
        * {
          cursor: none !important;
        }

        .star {
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .breathing {
          animation: breathing 4s ease-in-out infinite;
        }

        @keyframes breathing {
          0%, 100% { 
            filter: drop-shadow(0 0 5px currentColor);
            transform: scale(1); 
          }
          50% { 
            filter: drop-shadow(0 0 25px currentColor);
            transform: scale(1.02); 
          }
        }

        .interactive:hover {
          animation: interactive-glow 0.3s ease-in-out;
        }

        @keyframes interactive-glow {
          0% { box-shadow: 0 0 5px rgba(96, 165, 250, 0.3); }
          100% { box-shadow: 0 0 25px rgba(96, 165, 250, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio3D;