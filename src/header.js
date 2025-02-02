import React, { useState } from "react";
import "./header.css";

export default function Header() {
  const [showmenu, setshowmenu] = useState(false);

  const toggleMenu = () => {
    setshowmenu((prev) => !prev);
  };

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
    const path = window.location.pathname;
    return (
      <li className={path === href ? "active" : ""}>
        <a href={href}>{children}</a>
      </li>
    );
  }

  return (
    <>
      <section>
        <div id="home-cont">
          <div id="myname">
            <h1>SIMHADRI PRASANNA KUMAR</h1>
          </div>
          <div id="menuicon" onClick={toggleMenu}>
            {showmenu ? (
              <span>&#x2716; </span>
            ) : (
              <span>&#9776; </span>
            )}
          </div>
          <nav className={showmenu ? "show-menu" : ""}>
            <ul>
              {navLinks.map((link) => (
                <CustomLink key={link.href} href={link.href}>
                  {link.label}
                </CustomLink>
              ))}
            </ul>
            {showmenu ? (<><div id="icons">
                
                <ol>
                    <li title="Whatsaap"><ion-icon name="logo-whatsapp"></ion-icon></li>
                    <li title="Linkdein"><ion-icon name="logo-linkedin"></ion-icon></li>
                    <li title="Mobile"><ion-icon name="call-outline"></ion-icon></li>
                </ol>
                </div></>):(<></>)}
          </nav>
        </div>
      </section>
    </>
  );
}
