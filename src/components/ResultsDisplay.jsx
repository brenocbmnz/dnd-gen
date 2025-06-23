import React from 'react';

const ResultsDisplay = ({ image, backstory }) => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 animate-fade-in">
        <div className="md:col-span-2 bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-center">
            <img src={image} alt="Generated Character Portrait" className="rounded-lg shadow-xl w-full h-auto object-cover" />
        </div>
        <div className="md:col-span-3 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Backstory</h2>
            <div className="text-gray-300 leading-relaxed prose prose-invert" dangerouslySetInnerHTML={{ __html: backstory }} />
        </div>
    </div>
);

export default ResultsDisplay;
