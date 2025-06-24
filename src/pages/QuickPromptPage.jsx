import React, { useState } from 'react';
import { generateQuickPrompt } from '../api/generatorService';
import ResultsDisplay from '../components/ResultsDisplay';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

const QuickPromptPage = ({ onGenerateFullCharacter, apiKey }) => {
    const [quickCharacter, setQuickCharacter] = useState(null);
    const [isGeneratingConcept, setIsGeneratingConcept] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateConcept = async () => {
        setIsGeneratingConcept(true);
        setError(null);
        try {
            // Correctly passing the apiKey to the function call
            const result = await generateQuickPrompt(apiKey);
            setQuickCharacter(result);
        } catch (err) {
            console.error("Error generating quick prompt:", err);
            setError("Failed to generate a prompt. The spirits are restless. Please try again.");
        } finally {
            setIsGeneratingConcept(false);
        }
    };

    const handleCreateFull = () => {
        if (quickCharacter) {
            onGenerateFullCharacter(quickCharacter);
        }
    };

    if (!quickCharacter && !isGeneratingConcept) {
        return (
            <div className="hero min-h-[60vh] bg-base-200 rounded-box">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>Quick Prompt Generator</h1>
                        <p className="py-6">Need inspiration? Let the AI forge a character concept for you in seconds. A single click is all it takes to spark your next adventure.</p>
                        <button className="btn btn-primary" onClick={handleGenerateConcept} disabled={isGeneratingConcept}>
                            {isGeneratingConcept ? <span className="loading loading-spinner"></span> : "Generate a Character Concept"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="max-w-2xl mx-auto">
            {isGeneratingConcept && <LoadingIndicator />}
            {error && <ErrorMessage message={error} />}
            
            {quickCharacter && (
                <div className="card bg-base-200 shadow-xl animate-fade-in">
                    <div className="card-body">
                        <h2 className="card-title text-3xl" style={{ fontFamily: 'Cinzel, serif' }}>{quickCharacter.name}</h2>
                        <p className="text-base-content/70 -mt-2">
                            {quickCharacter.age}-year-old {quickCharacter.race} {quickCharacter.charClass} ({quickCharacter.pronouns})
                        </p>
                        <div className="divider my-2"></div>
                        <p className="italic">"{quickCharacter.description}"</p>
                        <div className="card-actions justify-center mt-6 gap-4">
                            <button className="btn btn-outline" onClick={handleGenerateConcept} disabled={isGeneratingConcept}>Reroll</button>
                            <button className="btn btn-primary" onClick={handleCreateFull}>
                                Forge This Character
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickPromptPage;