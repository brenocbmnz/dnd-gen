import React from 'react';

const HomePage = ({ onNavClick }) => {
  return (
    <div className="hero min-h-[70vh] bg-base-200 rounded-box">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>Welcome to the D&D Forge</h1>
          <p className="py-6">Your ultimate companion for bringing characters to life. Use our powerful AI to generate stunning portraits and compelling backstories from just a few words. Ready to create your next legend?</p>
          <button 
            className="btn btn-primary"
            onClick={() => onNavClick('character-creation')}
          >
            Start Creating
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;