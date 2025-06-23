import React from 'react';

const ErrorMessage = ({ message }) => (
    <div className="text-center my-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
        <p>{message}</p>
    </div>
);

export default ErrorMessage;