import React from 'react';

const ResultsDisplay = ({ image, backstory }) => (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mt-12 animate-fade-in">
        {/* Character Portrait Card */}
        <div className="card bg-base-200 shadow-xl lg:col-span-2">
            <figure className="p-4">
                <img src={image} alt="Generated Character Portrait" className="rounded-lg shadow-lg w-full h-auto object-cover" />
            </figure>
        </div>
        {/* Character Backstory Card */}
        <div className="card bg-base-200 shadow-xl lg:col-span-3">
            <div className="card-body">
                <h2 className="card-title text-2xl" style={{ fontFamily: 'Cinzel, serif' }}>Backstory</h2>
                <div className="text-base-content/90 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: backstory }} />
            </div>
        </div>
    </div>
);

export default ResultsDisplay;