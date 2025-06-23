import React from 'react';

const LoadingIndicator = () => (
    <div className="text-center my-10 flex flex-col items-center gap-4">
        <span className="loading loading-infinity loading-lg text-primary"></span>
        <p className="text-base-content/70">Conjuring your hero from the ether...</p>
    </div>
);

export default LoadingIndicator;
