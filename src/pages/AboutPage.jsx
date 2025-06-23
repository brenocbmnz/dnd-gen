import React from 'react';

const AboutPage = () => {
  return (
    <div className="card bg-base-200 shadow-xl max-w-4xl mx-auto">
      <div className="card-body">
        <h1 className="card-title text-3xl" style={{ fontFamily: 'Cinzel, serif' }}>About D&D Forge</h1>
        <div className="divider"></div>
        <p className="py-4">D&D Forge was created out of a passion for Dungeons & Dragons and the endless creativity it inspires. Our goal is to provide players and Dungeon Masters with a powerful tool to quickly visualize characters and spark narrative ideas using the latest in generative AI technology.</p>
        <p>Whether you're a seasoned adventurer or just starting your first campaign, we hope the Forge helps you bring your unique legends to life.</p>
      </div>
    </div>
  );
};

export default AboutPage;
