import React from 'react';
import logo from '../assets/anvil-logo.png'; // Import the logo

const Navigation = ({ currentPage, onNavClick }) => {
  const navItems = ['Character Creation', 'Quick Prompt'];

  return (
    <div className="navbar">
      <div className="flex-1">
        <a 
          href="#" 
          className="btn btn-ghost normal-case text-xl" 
          style={{ fontFamily: 'Cinzel, serif' }}
          onClick={(e) => {
            e.preventDefault();
            onNavClick('home');
          }}
        >
          <img src={logo} alt="Anvil Logo" className="w-8 h-8 mr-2" />
          D&D Forge
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navItems.map(item => {
            const pageKey = item.toLowerCase().replace(' ', '-');
            return (
              <li key={pageKey}>
                <a
                  href="#"
                  className={currentPage === pageKey ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(pageKey);
                  }}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
