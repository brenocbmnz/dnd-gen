import React, { useState } from 'react';

const CharacterForm = ({ onGenerate, isLoading }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [pronouns, setPronouns] = useState('they/them'); // Default to neutral
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate({ name, age, race, charClass, description, pronouns });
    };

    return (
        <div className="card bg-base-200 shadow-xl w-full max-w-4xl mx-auto">
            <div className="card-body p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-2">Character Forge</h2>
                    <p className="text-sm sm:text-base text-base-content/70">Create your D&D character with AI assistance</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    
                    {/* Basic Information Section */}
                    <div className="bg-base-100 rounded-lg p-4 sm:p-6 shadow-sm">
                        <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-4 pb-2 border-b border-base-300 text-center">
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium w-full text-center">Character Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="e.g., Elara Nightwind" 
                                    className="input input-bordered w-full focus:input-primary" 
                                    required 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium w-full text-center">Age</span>
                                </label>
                                <input 
                                    type="number" 
                                    value={age} 
                                    onChange={(e) => setAge(e.target.value)} 
                                    placeholder="e.g., 120" 
                                    className="input input-bordered w-full focus:input-primary" 
                                    min="0" 
                                    required 
                                />
                            </div>
                            <div className="form-control sm:col-span-2 lg:col-span-1">
                                <label className="label">
                                    <span className="label-text font-medium w-full text-center">Pronouns</span>
                                </label>
                                <select 
                                    className="select select-bordered focus:select-primary" 
                                    value={pronouns} 
                                    onChange={(e) => setPronouns(e.target.value)}
                                >
                                    <option>they/them</option>
                                    <option>he/him</option>
                                    <option>she/her</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Character Build Section */}
                    <div className="bg-base-100 rounded-lg p-4 sm:p-6 shadow-sm">
                        <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-4 pb-2 border-b border-base-300 text-center">
                            Character Build
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium w-full text-center">Race</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={race} 
                                    onChange={(e) => setRace(e.target.value)} 
                                    placeholder="e.g., High Elf" 
                                    className="input input-bordered w-full focus:input-primary" 
                                    required 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium w-full text-center">Class</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={charClass} 
                                    onChange={(e) => setCharClass(e.target.value)} 
                                    placeholder="e.g., Rogue" 
                                    className="input input-bordered w-full focus:input-primary" 
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-base-100 rounded-lg p-4 sm:p-6 shadow-sm">
                        <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-4 pb-2 border-b border-base-300 text-center">
                            Character Description
                        </h3>
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-2">
                                <span className="label-text font-medium">Description & Details</span>
                            </div>
                            <div className="text-center mb-3">
                                <span className="label-text-alt">Appearance, personality, backstory hints</span>
                            </div>
                            <div className="form-control">
                                <textarea 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    className="textarea textarea-bordered h-24 sm:h-32 focus:textarea-primary resize-none w-full" 
                                    placeholder="e.g., Wears scarred leather armor, has a sly grin and quick wit. Grew up on the streets..." 
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-2 sm:pt-4">
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="btn btn-primary btn-lg px-8 sm:px-12 shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    <span className="hidden sm:inline">Forging Character...</span>
                                    <span className="sm:hidden">Forging...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Forge Character
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CharacterForm;