import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown, ArrowRight, MapPin, Code2, User, Phone, Heart, Camera, Music, Zap, Database, Globe, Smartphone, Settings, Terminal, FileCode, Layers, Cloud, Monitor, Wrench, Cpu, Server, Palette, Layout, Download, Star, Award, Trophy, Shield } from 'lucide-react';

import chatbot from './project_assets/chatbot.png';
import online from './project_assets/Admin Panel - Google Chrome 15-07-2025 07_13_26.png';
import spkhub from './project_assets/spkhub.png';
import swasthik from './project_assets/React App - Google Chrome 27-01-2025 19_02_07.png';

const Portfolio3D = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(0); // 0=black, 1=text-reveal, 2=glitch, 3=done
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [typedText, setTypedText] = useState('');

  // ── Cursor: zero state, pure DOM refs ──
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const rafRef = useRef(null);

  const sectionsRef = useRef({});
  const canvasRef = useRef(null);

  const titles = ['Full Stack Developer', 'SaaS Builder', 'Backend Engineer', 'Problem Solver'];
  const titleIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  // ── SMOOTH CURSOR (RAF + lerp, no React state) ──
  useEffect(() => {
    const onMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const loop = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mouseX.current - 5}px, ${mouseY.current - 5}px)`;
      }
      ringX.current += (mouseX.current - ringX.current) * 0.13;
      ringY.current += (mouseY.current - ringY.current) * 0.13;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringX.current - 18}px, ${ringY.current - 18}px)`;
      }
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${ringX.current - 30}px, ${ringY.current - 30}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const grow = () => { if (cursorRingRef.current) { cursorRingRef.current.style.width = '52px'; cursorRingRef.current.style.height = '52px'; cursorRingRef.current.style.marginLeft = '-26px'; cursorRingRef.current.style.marginTop = '-26px'; cursorRingRef.current.style.opacity = '0.6'; } };
    const shrink = () => { if (cursorRingRef.current) { cursorRingRef.current.style.width = '36px'; cursorRingRef.current.style.height = '36px'; cursorRingRef.current.style.marginLeft = '0'; cursorRingRef.current.style.marginTop = '0'; cursorRingRef.current.style.opacity = '1'; } };
    document.querySelectorAll('a, button').forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });
    return () => document.querySelectorAll('a, button').forEach(el => { el.removeEventListener('mouseenter', grow); el.removeEventListener('mouseleave', shrink); });
  }, [isLoading]);

  // ── CANVAS STARFIELD ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.6 + 0.2,
      speed: Math.random() * 0.35 + 0.04,
      color: ['#ffffff', '#a8d8ff', '#ffd6ff', '#d6fffa'][Math.floor(Math.random() * 4)],
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.025 + 0.008
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.x -= s.speed;
        if (s.x < 0) { s.x = canvas.width; s.y = Math.random() * canvas.height; }
        s.twinkle += s.twinkleSpeed;
        const alpha = 0.25 + Math.abs(Math.sin(s.twinkle)) * 0.75;
        const sz = s.size * (0.7 + Math.abs(Math.sin(s.twinkle * 0.5)) * 0.5);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = sz * 8;
        ctx.shadowColor = s.color;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, sz, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      [{ x: 0.18, y: 0.22, r: 320, c: 'rgba(0,245,255,0.022)' }, { x: 0.82, y: 0.72, r: 380, c: 'rgba(179,71,255,0.022)' }, { x: 0.5, y: 0.5, r: 440, c: 'rgba(244,114,182,0.012)' }].forEach(n => {
        const grd = ctx.createRadialGradient(n.x * canvas.width, n.y * canvas.height, 0, n.x * canvas.width, n.y * canvas.height, n.r);
        grd.addColorStop(0, n.c); grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd; ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // Typewriter
  useEffect(() => {
    let t;
    const type = () => {
      const cur = titles[titleIndex.current];
      if (!isDeleting.current) {
        setTypedText(cur.substring(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === cur.length) { isDeleting.current = true; t = setTimeout(type, 1800); return; }
      } else {
        setTypedText(cur.substring(0, charIndex.current - 1));
        charIndex.current--;
        if (charIndex.current === 0) { isDeleting.current = false; titleIndex.current = (titleIndex.current + 1) % titles.length; }
      }
      t = setTimeout(type, isDeleting.current ? 52 : 92);
    };
    t = setTimeout(type, 1300);
    return () => clearTimeout(t);
  }, []);

  // ── CINEMATIC LOADING SEQUENCE ──
  useEffect(() => {
    // Phase 0 → 1: brief darkness then reveal
    const t0 = setTimeout(() => setLoadingPhase(1), 400);
    // Progress bar runs
    const iv = setInterval(() => setLoadingProgress(p => {
      if (p >= 100) { clearInterval(iv); return 100; }
      return Math.min(p + Math.random() * 12, 100);
    }), 110);
    // Phase 2: glitch/flash
    const t2 = setTimeout(() => setLoadingPhase(2), 2800);
    // Phase 3: white flash then dismiss
    const t3 = setTimeout(() => setLoadingPhase(3), 3400);
    const t4 = setTimeout(() => setIsLoading(false), 3800);
    return () => { clearTimeout(t0); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearInterval(iv); };
  }, []);

  // Section observer
  useEffect(() => {
    if (isLoading) return;
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }), { threshold: 0.3 });
    Object.values(sectionsRef.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [isLoading]);

  const scrollToSection = id => { sectionsRef.current[id]?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); };

  const handleResumeDownload = () => {
    const a = document.createElement('a');
    a.href = '/resume/PrasannaKumarSimhadri.pdf';
    a.download = 'PrasannaKumarSimhadri.pdf';
    a.target = '_blank';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const projects = [
    { id: 1, title: "ChatBot for College", description: "Developed and deployed a custom NLP-based Chatbot. Implemented Natural Language Processing for intent detection, keyword extraction, and response mapping. Fully responsive across mobile and desktop devices with smooth UX. Designed backend APIs with Node.js for handling user queries and dynamic responses.", tech: ["React", "Node.js", "NLP"], image: chatbot, github1: "https://github.com/spk-2005/rvrbot", github2: "https://github.com/spk-2005/rvrjcbot-backend", live: "https://rvrbot.netlify.app/", featured: true, category: "AI/ML", accent: "#00f5ff" },
    { id: 2, title: "Online Examination System", description: "Scalable Online Exam Portal with secure JWT authentication serving 1000+ concurrent users. The platform generated 3,700+ test submissions and ₹1,00,000+ in revenue with positive client feedback. MongoDB for dynamic data storage, PDF export, and responsive layouts.", tech: ["Next.js", "MongoDB", "JWT"], image: online, github1: "https://github.com/spk-2005/online-exam-departmental-test", github2: "#", live: "https://departmental-tests.netlify.app/", featured: true, category: "Web App", accent: "#b347ff" },
    { id: 3, title: "SPK-HUB", description: "Platform for real-time updates on current events, history, mysteries, and lifestyle topics. Fully responsive with Image-to-PDF and Text-to-PDF converters and SEO Optimization.", tech: ["React", "Express", "MongoDB"], image: spkhub, github1: "https://github.com/spk-2005/SPKHUB-FRONTEND", github2: "https://github.com/spk-2005/SPKHUB-backend", live: "https://spkhub.netlify.app/", featured: false, category: "Content Platform", accent: "#ff6b9d" },
    { id: 4, title: "SSEM School Website", description: "Custom prototype website for a school — clean, engaging, and informative for students, parents, and staff. Modern design patterns with fully responsive layouts.", tech: ["React", "Express", "MongoDB"], image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&h=300&fit=crop", github1: "https://github.com/spk-2005/ssem", github2: "#", live: "https://ssem2007.netlify.app/", featured: false, category: "Educational", accent: "#34d399" },
    { id: 5, title: "Krushi Kalpa", description: "Bridging Farmers & Consumers. A web application to empower farmers and connect them with consumers directly. Part of RUPAJNA 2025 Intra-College Prototype Competition — won 2nd place.", tech: ["React", "Express", "MongoDB"], image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop", github1: "https://github.com/spk-2005/krushikalpa", github2: "#", live: "", featured: false, category: "Agriculture Tech", accent: "#fbbf24" },
    { id: 6, title: "SWASTIK", description: "Visionary Prototype for Social Impact. Designed to tackle pressing social issues through collective action and innovation. Engages communities across four impactful categories.", tech: ["React", "Express", "MongoDB"], image: swasthik, github1: "#", github2: "#", live: "", featured: false, category: "Social Impact", accent: "#f97316" }
  ];

  const skillCategories = [
    { category: "Frontend", icon: <Monitor className="w-5 h-5" />, skills: [{ name: "React.js", icon: <FileCode className="w-4 h-4" /> }, { name: "Next.js", icon: <Layers className="w-4 h-4" /> }, { name: "JavaScript ES6+", icon: <Code2 className="w-4 h-4" /> }, { name: "TypeScript", icon: <FileCode className="w-4 h-4" /> }, { name: "HTML5 / CSS3", icon: <Layout className="w-4 h-4" /> }, { name: "Tailwind CSS", icon: <Wrench className="w-4 h-4" /> }, { name: "Redux", icon: <Layers className="w-4 h-4" /> }], color: "#00f5ff", glow: "rgba(0,245,255,0.3)" },
    { category: "Backend", icon: <Server className="w-5 h-5" />, skills: [{ name: "Node.js", icon: <Cpu className="w-4 h-4" /> }, { name: "Express.js", icon: <Terminal className="w-4 h-4" /> }, { name: "FastAPI", icon: <Zap className="w-4 h-4" /> }, { name: "Microservices", icon: <Layers className="w-4 h-4" /> }, { name: "REST APIs", icon: <Globe className="w-4 h-4" /> }, { name: "WebSockets", icon: <Zap className="w-4 h-4" /> }], color: "#b347ff", glow: "rgba(179,71,255,0.3)" },
    { category: "Database", icon: <Database className="w-5 h-5" />, skills: [{ name: "PostgreSQL", icon: <Database className="w-4 h-4" /> }, { name: "MongoDB Atlas", icon: <Database className="w-4 h-4" /> }, { name: "MySQL", icon: <Server className="w-4 h-4" /> }, { name: "Redis", icon: <Zap className="w-4 h-4" /> }, { name: "Firebase", icon: <Zap className="w-4 h-4" /> }, { name: "Airtable", icon: <Layers className="w-4 h-4" /> }], color: "#34d399", glow: "rgba(52,211,153,0.3)" },
    { category: "Cloud & DevOps", icon: <Cloud className="w-5 h-5" />, skills: [{ name: "CI/CD Pipelines", icon: <Zap className="w-4 h-4" /> }, { name: "Jenkins", icon: <Settings className="w-4 h-4" /> }, { name: "Netlify", icon: <Globe className="w-4 h-4" /> }, { name: "Render", icon: <Cloud className="w-4 h-4" /> }, { name: "Vercel", icon: <Zap className="w-4 h-4" /> }], color: "#fbbf24", glow: "rgba(251,191,36,0.3)" },
    { category: "Languages", icon: <Code2 className="w-5 h-5" />, skills: [{ name: "Python", icon: <FileCode className="w-4 h-4" /> }, { name: "JavaScript", icon: <Code2 className="w-4 h-4" /> }, { name: "TypeScript", icon: <FileCode className="w-4 h-4" /> }, { name: "Java", icon: <Cpu className="w-4 h-4" /> }, { name: "C", icon: <Terminal className="w-4 h-4" /> }], color: "#818cf8", glow: "rgba(129,140,248,0.3)" },
    { category: "Mobile Dev", icon: <Smartphone className="w-5 h-5" />, skills: [{ name: "React Native", icon: <Smartphone className="w-4 h-4" /> }], color: "#f472b6", glow: "rgba(244,114,182,0.3)" }
  ];

  // ── CINEMATIC LOADING SCREEN ──
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: loadingPhase === 3 ? '#fff' : '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, overflow: 'hidden',
        transition: loadingPhase === 3 ? 'background 0.4s ease' : 'none'
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Syne:wght@300;400;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

          @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
          @keyframes scan-v { 0%{top:-5%} 100%{top:105%} }
          @keyframes blink2 { 0%,100%{opacity:1} 50%{opacity:0} }
          @keyframes reveal-up { from{opacity:0;transform:translateY(40px) skewY(2deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
          @keyframes reveal-line { from{scaleX:0} to{scaleX:1} }
          @keyframes glitch-spk {
            0%{clip-path:none;transform:none;opacity:1}
            5%{clip-path:polygon(0 20%,100% 20%,100% 40%,0 40%);transform:translateX(-6px);filter:hue-rotate(180deg);opacity:0.85}
            10%{clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%);transform:translateX(6px);filter:hue-rotate(300deg)}
            15%{clip-path:none;transform:none;opacity:1;filter:none}
            85%{clip-path:none;transform:none;opacity:1}
            87%{clip-path:polygon(0 5%,100% 5%,100% 25%,0 25%);transform:translateX(-4px)}
            90%{clip-path:none;transform:none}
            100%{clip-path:none;transform:none;opacity:1}
          }
          @keyframes letter-emerge {
            0%{opacity:0;transform:scale(3) translateZ(0);filter:blur(20px)}
            60%{opacity:1;filter:blur(0)}
            100%{opacity:1;transform:scale(1);filter:blur(0)}
          }
          @keyframes chromatic {
            0%,100%{text-shadow:2px 0 #00f5ff,-2px 0 #f472b6}
            25%{text-shadow:4px 0 #00f5ff,-4px 0 #f472b6}
            50%{text-shadow:-2px 0 #00f5ff,2px 0 #b347ff}
            75%{text-shadow:0px 0 #00f5ff,0px 0 #f472b6}
          }
          @keyframes hline-slide { from{width:0;opacity:0} to{width:100%;opacity:1} }
          @keyframes sub-fade { from{opacity:0;letter-spacing:20px} to{opacity:0.7;letter-spacing:8px} }
          @keyframes warp { 0%{transform:scaleX(1)} 50%{transform:scaleX(1.04)} 100%{transform:scaleX(1)} }
          @keyframes vignette-pulse { 0%,100%{opacity:0.7} 50%{opacity:0.9} }
          @keyframes data-scroll { from{transform:translateY(0)} to{transform:translateY(-50%)} }
        `}</style>

        {/* Starfield bg */}
        {loadingPhase >= 1 && (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {Array.from({ length: 120 }, (_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: Math.random() * 2 + 0.5 + 'px',
                height: Math.random() * 2 + 0.5 + 'px',
                borderRadius: '50%',
                background: '#fff',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.7 + 0.1,
                animation: `blink2 ${2 + Math.random() * 4}s ${Math.random() * 3}s infinite`
              }} />
            ))}
          </div>
        )}

        {/* Horizontal scan lines for cinematic feel */}
        {loadingPhase >= 1 && (
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)', pointerEvents: 'none', zIndex: 2 }} />
        )}

        {/* Vignette */}
        {loadingPhase >= 1 && (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%,transparent 30%,rgba(0,0,0,0.85) 100%)', pointerEvents: 'none', zIndex: 2, animation: 'vignette-pulse 4s ease-in-out infinite' }} />
        )}

        {/* Vertical scan sweep */}
        {loadingPhase >= 1 && loadingPhase < 3 && (
          <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.6),rgba(255,255,255,0.8),rgba(0,245,255,0.6),transparent)', animation: 'scan-v 2.2s linear infinite', zIndex: 5, boxShadow: '0 0 20px rgba(0,245,255,0.4)' }} />
        )}

        {/* Scrolling data columns */}
        {loadingPhase >= 1 && (
          <>
            {[{ left: '5%' }, { right: '5%' }].map((pos, idx) => (
              <div key={idx} style={{ position: 'absolute', top: 0, ...pos, width: '1px', background: 'linear-gradient(180deg,transparent,rgba(0,245,255,0.15),transparent)', height: '100%', zIndex: 3 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '7px', color: 'rgba(0,245,255,0.2)', writingMode: 'vertical-rl', letterSpacing: '2px', animation: 'data-scroll 8s linear infinite', height: '200%' }}>
                  {'INIT_SEQUENCE.SYS_BOOT.NEURAL_LINK.ESTABLISH.PRASANNA.KUMAR.SIMHADRI.FULL.STACK.DEV.v2.0.'.repeat(8)}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Main content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, fontFamily: "'Orbitron',sans-serif", padding: '0 20px' }}>

          {/* Top classification label */}
          {loadingPhase >= 1 && (
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '8px', color: 'rgba(0,245,255,0.5)', marginBottom: '28px', animation: 'sub-fade 0.8s 0.2s both' }}>
              ◈ PORTFOLIO SYSTEM v2.0 ◈
            </div>
          )}

          {/* Top horizontal rule */}
          {loadingPhase >= 1 && (
            <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.6),rgba(255,255,255,0.8),rgba(0,245,255,0.6),transparent)', marginBottom: '32px', animation: 'hline-slide 0.6s 0.3s both', boxShadow: '0 0 10px rgba(0,245,255,0.3)' }} />
          )}

          {/* THE BIG SPK LETTERS */}
          {loadingPhase >= 1 && (
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              {/* Glow layer behind */}
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
                fontSize: 'clamp(100px,22vw,260px)',
                letterSpacing: '0.15em',
                color: 'transparent',
                filter: 'blur(40px)',
                background: 'linear-gradient(135deg,#00f5ff,#b347ff,#f472b6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: 0.4,
                userSelect: 'none'
              }}>SPK</div>

              {/* Main letters with per-letter animation */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.05em' }}>
                {['S', 'P', 'K'].map((letter, i) => (
                  <div key={letter} style={{
                    fontFamily: "'Orbitron',sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(100px,22vw,260px)',
                    lineHeight: 1,
                    background: 'linear-gradient(180deg,#ffffff 0%,#00f5ff 40%,#b347ff 75%,#f472b6 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    animation: `letter-emerge 0.9s ${0.4 + i * 0.15}s both, glitch-spk 6s ${2 + i * 0.3}s infinite, chromatic 3s ${1 + i * 0.4}s 1`,
                    filter: `drop-shadow(0 0 30px rgba(0,245,255,0.4)) drop-shadow(0 0 60px rgba(179,71,255,0.2))`,
                    letterSpacing: '0.08em'
                  }}>
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtitle: full name */}
          {loadingPhase >= 1 && (
            <div style={{ animation: 'reveal-up 0.7s 1.1s both' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 300, fontSize: 'clamp(11px,1.8vw,18px)', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Simhadri Prasanna Kumar
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '4px', color: 'rgba(0,245,255,0.55)' }}>
                FULL STACK DEVELOPER · SAAS BUILDER · ANDHRA PRADESH
              </div>
            </div>
          )}

          {/* Bottom rule */}
          {loadingPhase >= 1 && (
            <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.6),rgba(255,255,255,0.8),rgba(0,245,255,0.6),transparent)', marginTop: '32px', marginBottom: '28px', animation: 'hline-slide 0.6s 1.2s both', boxShadow: '0 0 10px rgba(0,245,255,0.3)' }} />
          )}

          {/* Progress */}
          {loadingPhase >= 1 && (
            <div style={{ animation: 'reveal-up 0.5s 1.4s both' }}>
              <div style={{ width: '280px', margin: '0 auto 8px', height: '1px', background: 'rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg,transparent,transparent 4px,rgba(0,245,255,0.06) 4px,rgba(0,245,255,0.06) 6px)' }} />
                <div style={{ height: '100%', width: `${Math.min(loadingProgress, 100)}%`, background: 'linear-gradient(90deg,#00f5ff,#b347ff,#f472b6)', transition: 'width 0.15s ease', boxShadow: '0 0 8px #00f5ff' }} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '4px', color: 'rgba(0,245,255,0.4)' }}>
                {Math.min(Math.round(loadingProgress), 100).toString().padStart(3, '0')}% · INITIALIZING
              </div>
            </div>
          )}

          {/* Bottom classification */}
          {loadingPhase >= 1 && (
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '7px', letterSpacing: '6px', color: 'rgba(255,255,255,0.15)', marginTop: '24px', animation: 'sub-fade 0.8s 1.6s both' }}>
              ◈ LOADING CREATIVE SYSTEMS ◈
            </div>
          )}
        </div>

        {/* Corner accents */}
        {loadingPhase >= 1 && ['tl', 'tr', 'bl', 'br'].map((pos) => (
          <div key={pos} style={{
            position: 'absolute',
            width: '50px', height: '50px',
            ...(pos.includes('t') ? { top: '24px' } : { bottom: '24px' }),
            ...(pos.includes('l') ? { left: '24px' } : { right: '24px' }),
            borderTop: pos.includes('t') ? '1px solid rgba(0,245,255,0.4)' : 'none',
            borderBottom: pos.includes('b') ? '1px solid rgba(0,245,255,0.4)' : 'none',
            borderLeft: pos.includes('l') ? '1px solid rgba(0,245,255,0.4)' : 'none',
            borderRight: pos.includes('r') ? '1px solid rgba(0,245,255,0.4)' : 'none',
            animation: 'reveal-up 0.5s 0.5s both',
            zIndex: 10
          }} />
        ))}
      </div>
    );
  }

  // ── MAIN ──
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Syne',sans-serif" }}>

      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Syne:wght@300;400;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />

      <style>{`
        *{cursor:none!important;box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#000}
        ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#00f5ff,#b347ff);border-radius:2px}

        .c-dot{position:fixed;top:0;left:0;width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#00f5ff,#b347ff);pointer-events:none;z-index:99999;will-change:transform;box-shadow:0 0 10px #00f5ff,0 0 20px rgba(0,245,255,0.4)}
        .c-ring{position:fixed;top:0;left:0;width:36px;height:36px;border-radius:50%;border:1px solid rgba(0,245,255,0.55);pointer-events:none;z-index:99998;will-change:transform;transition:width 0.2s,height 0.2s,border-color 0.2s}
        .c-ring::after{content:'';position:absolute;inset:3px;border-radius:50%;border:1px solid rgba(179,71,255,0.25)}
        .c-glow{position:fixed;top:0;left:0;width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,rgba(0,245,255,0.07) 0%,transparent 70%);pointer-events:none;z-index:99997;will-change:transform}

        .scanlines{position:fixed;inset:0;pointer-events:none;z-index:2;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)}
        .grid-bg{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(0,245,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.018) 1px,transparent 1px);background-size:75px 75px}

        .hc{position:fixed;width:36px;height:36px;pointer-events:none;z-index:3}
        .hc.tl{top:10px;left:10px;border-top:1px solid rgba(0,245,255,0.35);border-left:1px solid rgba(0,245,255,0.35)}
        .hc.tr{top:10px;right:10px;border-top:1px solid rgba(0,245,255,0.35);border-right:1px solid rgba(0,245,255,0.35)}
        .hc.bl{bottom:10px;left:10px;border-bottom:1px solid rgba(0,245,255,0.35);border-left:1px solid rgba(0,245,255,0.35)}
        .hc.br{bottom:10px;right:10px;border-bottom:1px solid rgba(0,245,255,0.35);border-right:1px solid rgba(0,245,255,0.35)}

        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes orbit-r{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes pulse-d{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.65)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes bounce-y{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(10px)}}
        @keyframes aurora{0%,100%{opacity:0.15;transform:scaleX(0.3) translateX(-40%)}50%{opacity:0.8;transform:scaleX(1) translateX(0)}}
        @keyframes glitch{0%,87%,100%{clip-path:none;transform:none}89%{clip-path:polygon(0 12%,100% 12%,100% 32%,0 32%);transform:translateX(-3px);filter:hue-rotate(90deg)}93%{clip-path:polygon(0 58%,100% 58%,100% 76%,0 76%);transform:translateX(3px)}96%{clip-path:none;transform:none;filter:none}}
        @keyframes flicker{0%,96%,100%{opacity:1}97%{opacity:0.6}}
        @keyframes scan-h{0%{transform:translateX(-100%)}100%{transform:translateX(100vw)}}
        @keyframes ds{0%{opacity:0;transform:translateY(-20px)}8%{opacity:1}92%{opacity:1}100%{opacity:0;transform:translateY(calc(100vh + 20px))}}
        @keyframes trophy-float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-6px) rotate(2deg)}}

        .section-tag{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:5px;color:#00f5ff;margin-bottom:12px;opacity:0.75;text-transform:uppercase}
        .section-title{font-family:'Orbitron',sans-serif;font-weight:700;background:linear-gradient(135deg,#00f5ff,#b347ff,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

        .glass{background:rgba(0,245,255,0.018);backdrop-filter:blur(14px);border:1px solid rgba(0,245,255,0.1);border-radius:8px;transition:all 0.35s cubic-bezier(.23,1,.32,1)}
        .glass:hover{background:rgba(0,245,255,0.032);border-color:rgba(0,245,255,0.22);transform:translateY(-4px);box-shadow:0 14px 44px rgba(0,245,255,0.07),inset 0 1px 0 rgba(0,245,255,0.08)}

        .btn-p{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:2px;background:linear-gradient(135deg,#0070e0,#5a10c0);border:none;color:#fff;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;cursor:none;transition:all 0.3s;box-shadow:0 0 22px rgba(0,120,255,0.28),inset 0 1px 0 rgba(255,255,255,0.08)}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,245,255,0.32)}

        .btn-o{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:2px;background:transparent;border:1px solid rgba(0,245,255,0.38);color:#00f5ff;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;cursor:none;transition:all 0.3s}
        .btn-o:hover{border-color:#00f5ff;background:rgba(0,245,255,0.05);box-shadow:0 0 18px rgba(0,245,255,0.18),inset 0 0 18px rgba(0,245,255,0.04);transform:translateY(-2px)}

        .nav-link{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;background:none;border:none;cursor:none;transition:all 0.3s;padding:3px 0;position:relative;color:rgba(255,255,255,0.38)}
        .nav-link::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:#00f5ff;transform:scaleX(0);transform-origin:left;transition:transform 0.3s}
        .nav-link.active{color:#00f5ff;text-shadow:0 0 10px rgba(0,245,255,0.55)}
        .nav-link.active::after{transform:scaleX(1)}
        .nav-link:hover:not(.active){color:rgba(255,255,255,0.75)}

        .skill-card{background:rgba(255,255,255,0.018);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:22px;transition:all 0.4s cubic-bezier(.23,1,.32,1);position:relative;overflow:hidden}
        .skill-card .top-bar{position:absolute;top:0;left:0;right:0;height:1px;opacity:0;transition:opacity 0.3s}
        .skill-card:hover{transform:translateY(-7px) scale(1.015)}
        .skill-card:hover .top-bar{opacity:1}

        .skill-item{display:flex;align-items:center;gap:9px;padding:7px 10px;border-radius:4px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);transition:all 0.2s;color:rgba(255,255,255,0.58);font-size:13px}
        .skill-item:hover{padding-left:14px}

        .project-row{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
        .tech-tag{display:inline-block;padding:4px 11px;border-radius:2px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1px;transition:all 0.2s}
        .social-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.38);transition:all 0.3s;backdrop-filter:blur(8px)}

        .ds{position:fixed;font-family:'JetBrains Mono',monospace;font-size:8px;color:rgba(0,245,255,0.1);pointer-events:none;z-index:0;animation:ds linear infinite;writing-mode:vertical-rl;letter-spacing:3px}

        .achievement-card{background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:22px;transition:all 0.4s cubic-bezier(.23,1,.32,1);position:relative;overflow:hidden}
        .achievement-card:hover{transform:translateY(-5px);}

        @media(max-width:768px){
          .project-row{grid-template-columns:1fr!important}
          .project-row>div{order:unset!important}
          .about-grid{grid-template-columns:1fr!important;gap:36px!important}
          .nav-d{display:none!important}
          .nav-m{display:flex!important}
          .achieve-grid{grid-template-columns:1fr!important}
        }
        @media(min-width:769px){.nav-m{display:none!important}}
      `}</style>

      <div ref={cursorDotRef} className="c-dot" />
      <div ref={cursorRingRef} className="c-ring" />
      <div ref={cursorGlowRef} className="c-glow" />

      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <div className="grid-bg" />
      <div className="scanlines" />

      <div style={{ position: 'fixed', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg,transparent,rgba(0,245,255,0.22),transparent)', pointerEvents: 'none', zIndex: 1, animation: 'scan-h 10s linear infinite' }} />

      <div className="hc tl" /><div className="hc tr" /><div className="hc bl" /><div className="hc br" />

      {[{ top: '28%', c: 'rgba(0,245,255,0.18)', dur: '9s' }, { top: '66%', c: 'rgba(179,71,255,0.14)', dur: '13s', rev: true }].map((a, i) => (
        <div key={i} style={{ position: 'fixed', top: a.top, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg,transparent,${a.c},transparent)`, animation: `aurora ${a.dur} ease-in-out infinite${a.rev ? ' reverse' : ''}`, pointerEvents: 'none', zIndex: 0 }} />
      ))}

      {['10110011', '01001101', '11100010', '00111010'].map((s, i) => (
        <div key={i} className="ds" style={{ left: `${6 + i * 26}%`, animationDuration: `${14 + i * 4}s`, animationDelay: `${i * 3.5}s` }}>
          {s.repeat(24)}
        </div>
      ))}

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, backdropFilter: 'blur(22px)', background: 'rgba(0,0,0,0.78)', borderBottom: '1px solid rgba(0,245,255,0.09)' }}>
        <div style={{ height: '2px', background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.5) 25%,rgba(179,71,255,0.5) 75%,transparent)', opacity: 0.7 }} />
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '58px' }}>
            <div onClick={() => scrollToSection('home')} style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '17px', fontWeight: 900, letterSpacing: '5px', cursor: 'none', color: '#00f5ff', textShadow: '0 0 18px rgba(0,245,255,0.65)', animation: 'flicker 7s infinite' }}>
              SPK
            </div>
            <div className="nav-d" style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
              {['home', 'about', 'skills', 'Projects', 'experience', 'achievements', 'contact'].map(s => (
                <button key={s} onClick={() => scrollToSection(s)} className={`nav-link ${activeSection === s ? 'active' : ''}`}>{s}</button>
              ))}
              <button onClick={handleResumeDownload} className="btn-o" style={{ padding: '7px 16px', fontSize: '9px' }}>
                <Download size={11} /> RESUME
              </button>
            </div>
            <button className="nav-m" onClick={() => setIsMenuOpen(v => !v)} style={{ display: 'none', background: 'none', border: 'none', color: '#00f5ff', cursor: 'none', alignItems: 'center' }}>
              {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,245,255,0.08)', padding: '14px 22px' }}>
            {['home', 'about', 'skills', 'Projects', 'experience', 'achievements', 'contact'].map(s => (
              <button key={s} onClick={() => scrollToSection(s)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', cursor: 'none', padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{s}</button>
            ))}
            <button onClick={handleResumeDownload} className="btn-o" style={{ marginTop: '14px' }}><Download size={12} /> DOWNLOAD RESUME</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" ref={el => sectionsRef.current.home = el} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '0 22px' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '620px', height: '620px', pointerEvents: 'none' }}>
          {[{ s: '100%', c: 'rgba(0,245,255,0.06)', d: '44s' }, { s: 'calc(100% - 100px)', c: 'rgba(179,71,255,0.06)', d: '31s', r: true }, { s: 'calc(100% - 200px)', c: 'rgba(244,114,182,0.06)', d: '21s' }].map((ring, i) => (
            <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: ring.s, height: ring.s, marginTop: `calc(-${ring.s}/2)`, marginLeft: `calc(-${ring.s}/2)`, borderRadius: '50%', border: `1px solid ${ring.c}`, animation: `orbit-r ${ring.d} linear infinite${ring.r ? ' reverse' : ''}` }} />
          ))}
          {[{ c: '#00f5ff', r: 310, d: '44s' }, { c: '#b347ff', r: 260, d: '31s', rev: true }, { c: '#f472b6', r: 210, d: '21s' }].map((dot, i) => (
            <div key={i} style={{ position: 'absolute', top: `calc(50% - ${dot.r}px)`, left: '50%', width: '7px', height: '7px', marginLeft: '-3.5px', borderRadius: '50%', background: dot.c, boxShadow: `0 0 12px ${dot.c}, 0 0 24px ${dot.c}40`, transformOrigin: `0 ${dot.r}px`, animation: `orbit-r ${dot.d} linear infinite${dot.rev ? ' reverse' : ''}` }} />
          ))}
        </div>

        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.05),transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg,transparent,rgba(0,245,255,0.05),transparent)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '840px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '34px', padding: '5px 16px', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(52,211,153,0.28)', borderRadius: '2px', backdropFilter: 'blur(8px)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399', animation: 'pulse-d 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '3px', color: '#34d399' }}>STATUS: AVAILABLE FOR WORK</span>
          </div>

          <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 'clamp(38px,8vw,94px)', fontWeight: 900, lineHeight: 0.93, marginBottom: '4px', background: 'linear-gradient(135deg,#fff 0%,#00f5ff 30%,#b347ff 65%,#f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-2px', filter: 'drop-shadow(0 0 28px rgba(0,245,255,0.22))', animation: 'glitch 9s infinite' }}>
            PRASANNA
          </h1>
          <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 'clamp(38px,8vw,94px)', fontWeight: 900, lineHeight: 0.93, marginBottom: '38px', background: 'linear-gradient(135deg,#00f5ff 0%,#b347ff 50%,#f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-2px' }}>
            KUMAR
          </h1>

          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 'clamp(12px,2vw,18px)', color: '#b347ff', letterSpacing: '3px', marginBottom: '50px', height: '24px', textShadow: '0 0 12px rgba(179,71,255,0.45)' }}>
            <span style={{ color: 'rgba(0,245,255,0.4)' }}>&gt;&nbsp;</span>{typedText}<span style={{ animation: 'blink 1s step-end infinite', color: '#00f5ff' }}>_</span>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button onClick={() => scrollToSection('Projects')} className="btn-p">VIEW PROJECTS <ArrowRight size={13} /></button>
            <button onClick={handleResumeDownload} className="btn-o"><Download size={13} /> DOWNLOAD RESUME</button>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {[{ href: "https://github.com/spk-2005", icon: <Github size={17} />, hc: '#00f5ff' }, { href: "https://www.linkedin.com/in/prasanna-kumar-simhadri-32aa80290/", icon: <Linkedin size={17} />, hc: '#b347ff' }, { href: "mailto:prasannasimha5002@gmail.com", icon: <Mail size={17} />, hc: '#f472b6' }].map((s, i) => (
              <a key={i} href={s.href} className="social-icon"
                onMouseEnter={e => { e.currentTarget.style.color = s.hc; e.currentTarget.style.borderColor = s.hc + '48'; e.currentTarget.style.background = s.hc + '10'; e.currentTarget.style.boxShadow = `0 0 16px ${s.hc}28`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '28px', left: '50%', color: '#00f5ff', animation: 'bounce-y 2s ease-in-out infinite', opacity: 0.55 }}>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" ref={el => sectionsRef.current.about = el} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 22px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }} className="about-grid">
            <div>
              <div className="section-tag">01. ABOUT ME</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(26px,4vw,44px)', lineHeight: 1.1, marginBottom: '26px' }}>Crafting Digital<br />Experiences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.85, fontSize: '15px' }}>
                <p>Final-year Computer Science student specializing in building scalable <strong style={{ color: '#00f5ff' }}>SaaS products</strong> and real-world software solutions.</p>
                <p>Experienced in developing impactful APIs and production-ready applications capable of handling <strong style={{ color: '#b347ff' }}>1000+ concurrent users</strong>. Passionate about AI-driven systems, backend engineering, and modern software development.</p>
                <p>When not coding — exploring new tech, contributing to open source, or reading about the latest in web development.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginTop: '26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#b347ff', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px' }}><MapPin size={12} /> ANDHRA PRADESH, INDIA</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#34d399', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 7px #34d399', animation: 'pulse-d 2s infinite' }} /> OPEN TO OPPORTUNITIES
                </div>
              </div>
              <button onClick={handleResumeDownload} className="btn-o" style={{ marginTop: '30px' }}><Download size={12} /> VIEW MY RESUME</button>
            </div>

            <div>
              <div className="glass" style={{ padding: '26px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(135deg,#00f5ff,#b347ff,#f472b6)', animation: 'orbit-r 5s linear infinite', padding: '2px' }}>
                      <div style={{ background: '#030606', borderRadius: '50%', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={22} style={{ color: '#00f5ff' }} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '13px', color: '#fff', marginBottom: '3px' }}>Prasanna Kumar</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: '#00f5ff', letterSpacing: '2px', opacity: 0.75 }}>FULL STACK DEVELOPER</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(0,245,255,0.04)', borderRadius: '5px', overflow: 'hidden' }}>
                  {[{ l: 'Projects', v: '10+', c: '#00f5ff' }, { l: 'CGPA', v: '8.5', c: '#b347ff' }, { l: 'Revenue', v: '₹1L+', c: '#f472b6' }].map(s => (
                    <div key={s.l} style={{ padding: '13px 6px', background: 'rgba(0,0,0,0.45)', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '17px', color: s.c, fontWeight: 700, textShadow: `0 0 8px ${s.c}55` }}>{s.v}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '7px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', marginTop: '3px' }}>{s.l.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass" style={{ padding: '18px', borderColor: 'rgba(179,71,255,0.1)', marginBottom: '14px' }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '3px', color: '#b347ff', marginBottom: '12px' }}>// INTERESTS</div>
                <div style={{ display: 'flex', gap: '9px', flexWrap: 'wrap' }}>
                  {[{ icon: <Camera size={13} />, label: 'Movies' }, { icon: <Music size={13} />, label: 'Music' }].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 13px', background: 'rgba(179,71,255,0.06)', border: '1px solid rgba(179,71,255,0.18)', borderRadius: '2px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                      <span style={{ color: '#b347ff' }}>{item.icon}</span> {item.label}
                    </div>
                  ))}
                </div>
              </div>
              {/* Certifications quick card */}
              <div className="glass" style={{ padding: '18px', borderColor: 'rgba(52,211,153,0.1)' }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '3px', color: '#34d399', marginBottom: '12px' }}>// CERTIFICATIONS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {[{ label: 'Full Stack Web Dev & Data Analytics', org: 'AICTE' }, { label: 'Python Programming', org: 'NPTEL' }].map(cert => (
                    <div key={cert.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.1)', borderRadius: '4px' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{cert.label}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', color: '#34d399', letterSpacing: '2px' }}>{cert.org}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" ref={el => sectionsRef.current.skills = el} style={{ padding: '100px 22px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-tag">02. TECH ARSENAL</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px,4vw,44px)' }}>Skills & Expertise</h2>
            <p style={{ color: 'rgba(255,255,255,0.3)', marginTop: '10px', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '3px' }}>
              // SKILL MATRIX LOADED
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '16px' }}>
            {skillCategories.map(cat => (
              <div key={cat.category} className="skill-card"
                onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color + '30'; e.currentTarget.style.boxShadow = `0 18px 52px ${cat.glow},inset 0 1px 0 ${cat.color}12`; e.currentTarget.style.transform = 'translateY(-7px) scale(1.015)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}>
                <div className="top-bar" style={{ background: `linear-gradient(90deg,transparent,${cat.color},transparent)` }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: cat.color + '10', border: `1px solid ${cat.color}28`, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '11px', fontWeight: 600, color: '#fff' }}>{cat.category}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', color: 'rgba(255,255,255,0.28)', letterSpacing: '1px' }}>{cat.skills.length} modules</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {cat.skills.map(sk => (
                    <div key={sk.name} className="skill-item"
                      onMouseEnter={e => { e.currentTarget.style.background = cat.color + '08'; e.currentTarget.style.borderColor = cat.color + '1c'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.paddingLeft = '14px'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.58)'; e.currentTarget.style.paddingLeft = '10px'; }}>
                      <span style={{ color: cat.color, opacity: 0.75, flexShrink: 0 }}>{sk.icon}</span>{sk.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button onClick={() => scrollToSection('Projects')} className="btn-p">VIEW MY PROJECTS <ArrowRight size={13} /></button>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="Projects" ref={el => sectionsRef.current.Projects = el} style={{ padding: '100px 22px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '76px' }}>
            <div className="section-tag">03. PROJECTS</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px,4vw,44px)' }}>My Work</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '88px' }}>
            {projects.map((p, i) => (
              <div key={p.id} className="project-row"
                onMouseEnter={() => setHoveredProject(p.id)}
                onMouseLeave={() => setHoveredProject(null)}>
                <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                  <div style={{ position: 'relative', borderRadius: '7px', overflow: 'hidden', border: `1px solid ${hoveredProject === p.id ? p.accent + '38' : 'rgba(255,255,255,0.07)'}`, transition: 'all 0.4s', boxShadow: hoveredProject === p.id ? `0 0 0 1px ${p.accent}18, 0 18px 52px ${p.accent}15` : 'none' }}>
                    {hoveredProject === p.id && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg,transparent,${p.accent},transparent)`, zIndex: 3, animation: 'scan-h 1.6s linear infinite' }} />}
                    <div style={{ position: 'absolute', top: '11px', left: '11px', zIndex: 2, padding: '3px 9px', background: p.accent + '1e', border: `1px solid ${p.accent}38`, color: p.accent, fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '2px', borderRadius: '1px' }}>
                      {p.category.toUpperCase()}
                    </div>
                    <div style={{ position: 'absolute', top: '11px', right: '11px', zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,0,0,0.68)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron',monospace", fontSize: '8px', color: p.accent, border: `1px solid ${p.accent}28` }}>
                      {String(p.id).padStart(2, '0')}
                    </div>
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '270px', objectFit: 'cover', transition: 'transform 0.6s', transform: hoveredProject === p.id ? 'scale(1.06)' : 'scale(1)', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${p.accent}22, transparent)`, opacity: hoveredProject === p.id ? 1 : 0, transition: 'opacity 0.4s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {p.live && (
                        <a href={p.live} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.62)', backdropFilter: 'blur(10px)', border: `1px solid ${p.accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.accent, boxShadow: `0 0 18px ${p.accent}38` }}>
                          <ExternalLink size={17} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ order: i % 2 === 1 ? 1 : 2 }}>
                  {p.featured && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '11px' }}>
                      <Star size={10} style={{ color: p.accent, fill: p.accent }} />
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '3px', color: p.accent, textShadow: `0 0 8px ${p.accent}` }}>FEATURED PROJECT</span>
                    </div>
                  )}
                  <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 'clamp(16px,2.5vw,24px)', fontWeight: 700, color: '#fff', marginBottom: '16px', transition: 'all 0.3s', transform: hoveredProject === p.id ? 'translateX(8px)' : 'translateX(0)', textShadow: hoveredProject === p.id ? `0 0 18px ${p.accent}38` : 'none' }}>
                    {p.title}
                  </h3>
                  <div style={{ padding: '16px', borderRadius: '5px', marginBottom: '16px', background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                    {hoveredProject === p.id && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: p.accent, boxShadow: `0 0 7px ${p.accent}` }} />}
                    <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.85, fontSize: '14px' }}>{p.description}</p>
                  </div>
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '3px', color: p.accent, marginBottom: '8px', opacity: 0.85 }}>// TECH STACK</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {p.tech.map(t => <span key={t} className="tech-tag" style={{ background: p.accent + '10', border: `1px solid ${p.accent}25`, color: p.accent }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {[{ href: p.github1, icon: <Github size={12} />, label: 'Frontend' }, ...(p.github2 !== '#' ? [{ href: p.github2, icon: <Github size={12} />, label: 'Backend' }] : []), ...(p.live ? [{ href: p.live, icon: <ExternalLink size={12} />, label: 'Live Demo' }] : [])].map(lk => (
                      <a key={lk.label} href={lk.href} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255, 255, 255, 0.74)', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '1px', transition: 'all 0.3s', textDecoration: 'none' }}
                        onMouseEnter={e => { e.currentTarget.style.color = p.accent; e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.textShadow = `0 0 7px ${p.accent}`; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.74)'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.textShadow = 'none'; }}>
                        {lk.icon} {lk.label} <ArrowRight size={8} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" ref={el => sectionsRef.current.experience = el} style={{ padding: '100px 22px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-tag">04. EXPERIENCE</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px,4vw,44px)' }}>Journey</h2>
          </div>
          <div style={{ position: 'relative', paddingLeft: '42px' }}>
            <div style={{ position: 'absolute', left: '13px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg,#00f5ff,#b347ff 55%,transparent)' }} />

            {/* Freelancer */}
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <div style={{ position: 'absolute', left: '-31px', top: '22px', width: '13px', height: '13px', borderRadius: '50%', background: '#00f5ff', border: '2px solid #000', boxShadow: '0 0 12px #00f5ff, 0 0 24px rgba(0,245,255,0.35)' }} />
              <div className="glass" style={{ padding: '22px' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(7px)'; e.currentTarget.style.borderColor = 'rgba(0,245,255,0.22)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'rgba(0,245,255,0.1)'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '7px', marginBottom: '7px' }}>
                  <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '14px', fontWeight: 600, color: '#fff' }}>Freelance Developer</h3>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '2px', color: '#00f5ff', padding: '3px 8px', background: 'rgba(0,245,255,0.07)', borderRadius: '1px', border: '1px solid rgba(0,245,255,0.18)' }}>NOV 2024 – PRESENT</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', color: 'rgba(255,255,255,0.38)', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', marginBottom: '12px' }}>
                  <span>⚡ Independent</span><span>·</span><span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={10} /> Remote</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }}>
                  {[
                    'Built & deployed scalable Online Exam Portal — 1000+ users, ₹1,00,000+ revenue, 3700+ submissions',
                    'Architected high-performance SaaS APIs: Resume ATS Scoring & Document Intelligence systems',
                    'Implemented JWT auth, Redis caching, WebSockets, CI/CD pipelines, and rate limiting',
                    'Managed domain configs and cloud deployments with automated pipelines'
                  ].map((bullet, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', color: 'rgba(255,255,255,0.58)', fontSize: '13px', lineHeight: 1.7 }}>
                      <span style={{ color: '#00f5ff', flexShrink: 0, marginTop: '3px' }}>›</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {["React", "Next.js", "Node.js", "FastAPI", "PostgreSQL", "Redis", "MongoDB", "CI/CD"].map(t => <span key={t} className="tech-tag" style={{ background: 'rgba(0,245,255,0.07)', border: '1px solid rgba(0,245,255,0.18)', color: '#00f5ff' }}>{t}</span>)}
                </div>
              </div>
            </div>

            {/* SDE Intern */}
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <div style={{ position: 'absolute', left: '-31px', top: '22px', width: '13px', height: '13px', borderRadius: '50%', background: '#b347ff', border: '2px solid #000', boxShadow: '0 0 12px #b347ff, 0 0 24px rgba(179,71,255,0.35)' }} />
              <div className="glass" style={{ padding: '22px', borderColor: 'rgba(179,71,255,0.1)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(7px)'; e.currentTarget.style.borderColor = 'rgba(179,71,255,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'rgba(179,71,255,0.1)'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '7px', marginBottom: '7px' }}>
                  <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '14px', fontWeight: 600, color: '#fff' }}>SDE Intern</h3>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '2px', color: '#b347ff', padding: '3px 8px', background: 'rgba(179,71,255,0.07)', borderRadius: '1px', border: '1px solid rgba(179,71,255,0.18)' }}>APR 2025 – JUN 2025</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', color: 'rgba(255,255,255,0.38)', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', marginBottom: '12px' }}>
                  <span>🔺 Bluestock™</span><span>·</span><span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={10} /> Remote</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.82, fontSize: '14px', marginBottom: '16px' }}>
                  Gained hands-on experience in full stack development and served as Team Lead. Led a passionate team contributing to impactful fintech solutions.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {["React", "Node.js", "Firebase", "MongoDB"].map(t => <span key={t} className="tech-tag" style={{ background: 'rgba(179,71,255,0.07)', border: '1px solid rgba(179,71,255,0.18)', color: '#b347ff' }}>{t}</span>)}
                </div>
              </div>
            </div>

            {/* Education */}
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <div style={{ position: 'absolute', left: '-31px', top: '22px', width: '13px', height: '13px', borderRadius: '50%', background: '#f472b6', border: '2px solid #000', boxShadow: '0 0 12px #f472b6, 0 0 24px rgba(244,114,182,0.35)' }} />
              <div className="glass" style={{ padding: '22px', borderColor: 'rgba(244,114,182,0.1)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(7px)'; e.currentTarget.style.borderColor = 'rgba(244,114,182,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'rgba(244,114,182,0.1)'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '7px', marginBottom: '7px' }}>
                  <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '14px', fontWeight: 600, color: '#fff' }}>B.Tech CSE — Data Science</h3>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '2px', color: '#f472b6', padding: '3px 8px', background: 'rgba(244,114,182,0.07)', borderRadius: '1px', border: '1px solid rgba(244,114,182,0.18)' }}>2022 – 2026</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '11px', color: 'rgba(255,255,255,0.32)', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px' }}>
                  <Award size={10} style={{ color: '#f472b6' }} /> RVR & JC COLLEGE OF ENGINEERING, GUNTUR
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.82, fontSize: '14px' }}>
                    Focused on Software Engineering and Web Development. Participated in coding competitions, hackathons, and open source projects.
                  </p>
                  <div style={{ padding: '8px 14px', background: 'rgba(244,114,182,0.07)', border: '1px solid rgba(244,114,182,0.2)', borderRadius: '4px', textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '18px', color: '#f472b6', fontWeight: 700 }}>8.5</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '7px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>CGPA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <div style={{ display: 'inline-block', padding: '1px', background: 'linear-gradient(135deg,#00f5ff,#b347ff,#f472b6)', borderRadius: '3px' }}>
              <button onClick={handleResumeDownload} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '15px 38px', background: '#030608', border: 'none', borderRadius: '2px', color: '#fff', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '3px', cursor: 'none', transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = '#030608'}>
                <Download size={14} style={{ color: '#00f5ff' }} /> DOWNLOAD FULL RESUME <ArrowRight size={12} style={{ color: '#b347ff' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" ref={el => sectionsRef.current.achievements = el} style={{ padding: '100px 22px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-tag">05. ACHIEVEMENTS</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px,4vw,44px)' }}>Milestones</h2>
            <p style={{ color: 'rgba(255,255,255,0.3)', marginTop: '10px', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '3px' }}>
              // BATTLE LOG LOADED
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '20px' }} className="achieve-grid">
            {[
              {
                icon: '🏆',
                rank: '2nd Place',
                title: 'RUPAJNA 2025',
                org: 'ITBI Center · RJE-NEST · RVRJC College',
                description: 'Led development team and built an innovative platform designed to empower communities by addressing pressing social and environmental challenges.',
                tech: ['React', 'Express', 'MongoDB'],
                accent: '#fbbf24',
                glow: 'rgba(251,191,36,0.3)'
              },
              {
                icon: '🚀',
                rank: 'Participant',
                title: 'Smart India Hackathon 2025',
                org: 'ISRO · Problem Statement 25177',
                description: "Developed 'SafeMarg' — a mobile-based navigation app designed to help prevent road accidents through intelligent route guidance and real-time safety alerts.",
                tech: ['React Native', 'Node.js', 'Maps API'],
                accent: '#00f5ff',
                glow: 'rgba(0,245,255,0.3)'
              },
              {
                icon: '💡',
                rank: 'Team Lead',
                title: 'VJ Hackathon 2025',
                org: 'VNRVJIET · Hyderabad',
                description: "Built 'JeevanPath' — a mobile app solving healthcare accessibility using voice recognition and intelligent route mapping to help users find nearby health resources.",
                tech: ['React Native', 'Voice Recognition', 'Maps'],
                accent: '#b347ff',
                glow: 'rgba(179,71,255,0.3)'
              }
            ].map((a, i) => (
              <div key={i} className="achievement-card"
                onMouseEnter={e => { e.currentTarget.style.borderColor = a.accent + '30'; e.currentTarget.style.boxShadow = `0 18px 52px ${a.glow},inset 0 1px 0 ${a.accent}12`; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg,transparent,${a.accent},transparent)`, opacity: 0.7 }} />

                {/* Icon + rank badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ fontSize: '36px', animation: i === 0 ? 'trophy-float 3s ease-in-out infinite' : 'none' }}>{a.icon}</div>
                  <div style={{ padding: '4px 10px', background: a.accent + '18', border: `1px solid ${a.accent}38`, borderRadius: '2px', fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '2px', color: a.accent }}>
                    {a.rank.toUpperCase()}
                  </div>
                </div>

                <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{a.title}</h3>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>{a.org}</div>

                <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: '13px', marginBottom: '16px' }}>{a.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {a.tech.map(t => <span key={t} className="tech-tag" style={{ background: a.accent + '0e', border: `1px solid ${a.accent}22`, color: a.accent, fontSize: '9px' }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Impact stats bar */}
          <div style={{ marginTop: '48px', padding: '28px', background: 'rgba(0,245,255,0.015)', border: '1px solid rgba(0,245,255,0.08)', borderRadius: '8px' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '4px', color: 'rgba(0,245,255,0.5)', textAlign: 'center', marginBottom: '24px' }}>// IMPACT METRICS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', textAlign: 'center' }}>
              {[
                { val: '1000+', label: 'Concurrent Users', c: '#00f5ff' },
                { val: '₹1L+', label: 'Revenue Generated', c: '#fbbf24' },
                { val: '3700+', label: 'Test Submissions', c: '#b347ff' },
                { val: 'Multple', label: 'Real world projects', c: '#f472b6' }
              ].map(m => (
                <div key={m.label}>
                  <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 'clamp(20px,3vw,32px)', fontWeight: 700, color: m.c, textShadow: `0 0 16px ${m.c}55`, marginBottom: '6px' }}>{m.val}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)' }}>{m.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" ref={el => sectionsRef.current.contact = el} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 22px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '740px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
          <div className="section-tag">06. CONTACT</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(30px,6vw,62px)', lineHeight: 1.05, marginBottom: '18px', filter: 'drop-shadow(0 0 18px rgba(0,245,255,0.18))' }}>
            Let's Build<br />Together
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.9, marginBottom: '50px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '1px' }}>
            &gt; READY TO COLLABORATE ON SOMETHING GREAT?<br />&gt; TRANSMIT YOUR MESSAGE.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            {[{ icon: <Mail size={15} />, label: 'EMAIL', value: 'prasannasimha5002@gmail.com', href: 'mailto:prasannasimha5002@gmail.com', c: '#00f5ff' }, { icon: <Phone size={15} />, label: 'PHONE', value: '+91 8309179509', href: 'tel:+918309179509', c: '#b347ff' }].map(ct => (
              <a key={ct.label} href={ct.href} className="glass" style={{ display: 'flex', alignItems: 'center', gap: '13px', padding: '15px 20px', textDecoration: 'none', color: 'rgba(255,255,255,0.62)', borderColor: ct.c + '15' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ct.c + '38'; e.currentTarget.style.background = ct.c + '05'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 12px 38px ${ct.c}10`; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ct.c + '15'; e.currentTarget.style.background = 'rgba(0,245,255,0.018)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.62)'; }}>
                <span style={{ color: ct.c, filter: `drop-shadow(0 0 5px ${ct.c})` }}>{ct.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '7px', letterSpacing: '3px', color: ct.c, marginBottom: '3px' }}>{ct.label}</div>
                  <div style={{ fontSize: '13px' }}>{ct.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '11px', justifyContent: 'center', marginBottom: '48px' }}>
            {[{ href: "https://github.com/spk-2005", icon: <Github size={18} />, c: '#00f5ff' }, { href: "https://www.linkedin.com/in/prasanna-kumar-simhadri-32aa80290/", icon: <Linkedin size={18} />, c: '#b347ff' }, { href: "mailto:prasannasimha5002@gmail.com", icon: <Mail size={18} />, c: '#f472b6' }].map((s, i) => (
              <a key={i} href={s.href} className="social-icon"
                onMouseEnter={e => { e.currentTarget.style.color = s.c; e.currentTarget.style.borderColor = s.c + '45'; e.currentTarget.style.background = s.c + '0e'; e.currentTarget.style.boxShadow = `0 0 16px ${s.c}28`; e.currentTarget.style.transform = 'translateY(-4px) rotate(5deg)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'; }}>
                {s.icon}
              </a>
            ))}
          </div>

          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.18)' }}>
            MADE WITH <Heart size={10} style={{ display: 'inline', color: '#f472b6', verticalAlign: 'middle', filter: 'drop-shadow(0 0 4px #f472b6)', animation: 'pulse-d 1.5s ease-in-out infinite' }} /> IN THE GALAXY
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio3D;