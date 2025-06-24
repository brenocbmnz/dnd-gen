import React, { useState } from 'react';
import { generateQuickPrompt } from '../api/generatorService';
import ResultsDisplay from '../components/ResultsDisplay';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

const QuickPromptPage = ({ 
    onGenerateFullCharacter, 
    apiKey, 
    isLoading, 
    error, 
    characterImage, 
    characterBackstory 
}) => {
    const [quickCharacter, setQuickCharacter] = useState(null);
    const [isGeneratingConcept, setIsGeneratingConcept] = useState(false);
    const [conceptError, setConceptError] = useState(null);
    const [hasGeneratedFull, setHasGeneratedFull] = useState(false);

    const handleGenerateConcept = async () => {
        setIsGeneratingConcept(true);
        setConceptError(null);
        setHasGeneratedFull(false);
        try {
            const result = await generateQuickPrompt(apiKey);
            setQuickCharacter(result);
        } catch (err) {
            console.error("Error generating quick prompt:", err);
            setConceptError("Failed to generate a prompt. The spirits are restless. Please try again.");
        } finally {
            setIsGeneratingConcept(false);
        }
    };

    const handleCreateFull = () => {
        if (quickCharacter) {
            setHasGeneratedFull(true);
            onGenerateFullCharacter(quickCharacter);
        }
    };

    const handleStartOver = () => {
        setQuickCharacter(null);
        setHasGeneratedFull(false);
        setConceptError(null);
    };

    // Show results if we have both image and backstory after generating
    const showResults = hasGeneratedFull && !isLoading && characterImage && characterBackstory;

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
        <div className="max-w-6xl mx-auto">
            {isGeneratingConcept && <LoadingIndicator />}
            {conceptError && <ErrorMessage message={conceptError} />}
            
            {quickCharacter && !showResults && (
                <div className="card bg-base-200 shadow-xl animate-fade-in max-w-2xl mx-auto">
                    <div className="card-body">
                        <h2 className="card-title text-3xl" style={{ fontFamily: 'Cinzel, serif' }}>{quickCharacter.name}</h2>
                        <p className="text-base-content/70 -mt-2">
                            {quickCharacter.age}-year-old {quickCharacter.race} {quickCharacter.charClass} ({quickCharacter.pronouns})
                        </p>
                        <div className="divider my-2"></div>
                        <p className="italic">"{quickCharacter.description}"</p>
                        <div className="card-actions justify-center mt-6 gap-4">
                            <button className="btn btn-outline" onClick={handleGenerateConcept} disabled={isGeneratingConcept || isLoading}>
                                Reroll
                            </button>
                            <button className="btn btn-primary" onClick={handleCreateFull} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Forging...
                                    </>
                                ) : (
                                    "Forge This Character"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isLoading && hasGeneratedFull && <LoadingIndicator />}
            {error && hasGeneratedFull && <ErrorMessage message={error} />}
            
            {showResults && (
                <>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>{quickCharacter.name}</h1>
                        <p className="text-base-content/70">
                            {quickCharacter.age}-year-old {quickCharacter.race} {quickCharacter.charClass} ({quickCharacter.pronouns})
                        </p>
                        <button className="btn btn-outline mt-4" onClick={handleStartOver}>
                            Create Another Character
                        </button>
                    </div>
                    <ResultsDisplay image={characterImage} backstory={characterBackstory} />
                </>
            )}
        </div>
    );
};

export default QuickPromptPage;