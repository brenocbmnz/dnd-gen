import React, { useState } from 'react';

const CharacterForm = ({ onGenerate, isLoading }) => {
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate({ race, charClass, description });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="race-input" className="block text-sm font-medium text-gray-300 mb-2">Race</label>
                    <input type="text" id="race-input" value={race} onChange={(e) => setRace(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="e.g., Mountain Dwarf" required />
                </div>
                <div>
                    <label htmlFor="class-input" className="block text-sm font-medium text-gray-300 mb-2">Class</label>
                    <input type="text" id="class-input" value={charClass} onChange={(e) => setCharClass(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="e.g., Battle-Rager Barbarian" required />
                </div>
            </div>
            <div className="mt-6">
                <label htmlFor="description-input" className="block text-sm font-medium text-gray-300 mb-2">Description & Details</label>
                <textarea id="description-input" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="e.g., Wears scarred plate armor..." required></textarea>
            </div>
            <div className="mt-6 text-center">
                <button type="submit" disabled={isLoading} className="w-full md:w-auto bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? 'Generating...' : 'Generate Character'}
                </button>
            </div>
        </form>
    );
};

export default CharacterForm;