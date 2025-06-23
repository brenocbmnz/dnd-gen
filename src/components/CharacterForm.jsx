import React, { useState } from 'react';

const CharacterForm = ({ onGenerate, isLoading }) => {
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [pronouns, setPronouns] = useState('they/them'); // Default to neutral
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate({ name, race, charClass, description, pronouns });
    };

    return (
        <div className="card bg-base-200 shadow-xl w-full max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="card-body gap-4">
                
                {/* Top Row: Name, Race, Class */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Character Name</span>
                        </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Elara Nightwind" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Race</span>
                        </label>
                        <input type="text" value={race} onChange={(e) => setRace(e.target.value)} placeholder="e.g., High Elf" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class</span>
                        </label>
                        <input type="text" value={charClass} onChange={(e) => setCharClass(e.target.value)} placeholder="e.g., Rogue" className="input input-bordered w-full" required />
                    </div>
                </div>

                {/* Second Row: Pronouns and Description */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Pronouns</span>
                        </label>
                        <select className="select select-bordered" value={pronouns} onChange={(e) => setPronouns(e.target.value)}>
                            <option>they/them</option>
                            <option>he/him</option>
                            <option>she/her</option>
                        </select>
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Description & Details</span>
                        </label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered h-24" placeholder="e.g., Wears scarred leather armor, has a sly grin..." required></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="card-actions justify-center mt-6">
                    <button type="submit" disabled={isLoading} className="btn btn-primary btn-wide">
                        {isLoading ? <span className="loading loading-spinner"></span> : 'Forge Character'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CharacterForm;

