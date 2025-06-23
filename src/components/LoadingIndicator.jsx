import React from 'react';

const LoadingIndicator = () => (
    <div className="text-center my-10">
        <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 rounded-full animate-pulse bg-yellow-400"></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-yellow-500" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-yellow-600" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="mt-4 text-gray-400">Conjuring your hero from the ether...</p>
    </div>
);

export default LoadingIndicator;
