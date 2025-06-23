import React from 'react';

const Footer = ({ onNavClick }) => {
  return (
    <footer className="footer footer-center p-4 text-base-content">
        <div>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by D&D Forge</p>
      </div>
      <div className="grid grid-flow-col gap-4">
        <a href="#" className="link link-hover" onClick={(e) => { e.preventDefault(); onNavClick('about'); }}>About</a>
        <a href="#" className="link link-hover" onClick={(e) => { e.preventDefault(); onNavClick('contact'); }}>Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
