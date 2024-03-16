import React, { useState } from "react";
import './navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav id="desktop-nav">
        <div className="logo">Cyrpt-n-Move</div>
        <div>
          <ul className="nav-links">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="#">Tech</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <nav id="hamburger-nav">
        <div className="logo">VoteChain</div>
        <div className="hamburger-menu">
          <div className="hamburger-icon" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`menu-links ${isMenuOpen ? "open" : ""}`}>
            <ul>
              <li>
                <a href="#" onClick={toggleMenu}>
                  Home
                </a>
              </li>
              <li>
                <a href="/src/pages/polls.html" onClick={toggleMenu}>
                  Polls
                </a>
              </li>
              <li>
                <a href="#" onClick={toggleMenu}>
                  About
                </a>
              </li>
              <li>
                <a href="#" onClick={toggleMenu}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
