import React, { useState, useEffect } from "react";
import "./header.css";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  
  // Set initial path on component mount
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('nav') && !event.target.closest('#menuicon')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && showMenu) {
        setShowMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showMenu]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/internships", label: "Internships & Certifications" },
    { href: "/skills", label: "Skills & Technologies" },
    { href: "/experience", label: "Experience" },
    { href: "/contact", label: "Contact" },
  ];

  function CustomLink({ href, children }) {
    return (
      <li className={currentPath === href ? "active" : ""}>
        <a 
          href={href}
          onClick={() => {
            setCurrentPath(href);
            setShowMenu(false); // Close menu when clicking a link
          }}
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <header className="header">
      <div id="home-cont">
        <div id="myname">
          <h1>SIMHADRI PRASANNA KUMAR</h1>
        </div>
        
        <div id="menuicon" onClick={toggleMenu}>
          {showMenu ? (
            <span className="close-icon">&#x2716;</span>
          ) : (
            <span className="menu-icon">&#9776;</span>
          )}
        </div>
        
        <nav className={showMenu ? "show-menu" : ""}>
          <ul>
            {navLinks.map((link) => (
              <CustomLink key={link.href} href={link.href}>
                {link.label}
              </CustomLink>
            ))}
          </ul>
          
          {showMenu && (
            <div id="icons">
              <span id="atrate">@prasannakumar</span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}