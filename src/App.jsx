import React, { useState } from 'react';
import { generateImage, generateBackstory } from './api/generatorService';
import Header from './components/Header';
import CharacterForm from './components/CharacterForm';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';
import ResultsDisplay from './components/ResultsDisplay';

export default function App() {
    const [characterImage, setCharacterImage] = useState('');
    const [characterBackstory, setCharacterBackstory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Read API Key and Project ID from .env file
    const API_KEY = import.meta.env.VITE_API_KEY;
    const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

    const handleGeneration = async ({ race, charClass, description }) => {
        setIsLoading(true);
        setError(null);
        setCharacterImage('');
        setCharacterBackstory('');

        try {
            const imagePrompt = `Epic fantasy character portrait of a ${race} ${charClass}. ${description}. Cinematic lighting, detailed, digital painting, artstation, concept art.`;
            const backstoryPrompt = `Write a short, compelling Dungeons and Dragons backstory for the following character. Be creative. Character: A ${race} ${charClass} who ${description}.`;
            
            const [imageResponse, backstoryResponse] = await Promise.all([
                // Pass the Project ID to the image generation function
                generateImage(imagePrompt, API_KEY, PROJECT_ID),
                generateBackstory(backstoryPrompt, API_KEY)
            ]);

            const formattedBackstory = `<p>${backstoryResponse.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
            setCharacterImage(imageResponse);
            setCharacterBackstory(formattedBackstory);

        } catch (err) {
            console.error("Error during character generation:", err);
            setError(`The ritual failed. ${err.message}.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen" style={{ fontFamily: 'Cinzel, serif' }}>
            <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-4xl">
                <Header />
                <CharacterForm onGenerate={handleGeneration} isLoading={isLoading} />
                
                {isLoading && <LoadingIndicator />}
                {error && <ErrorMessage message={error} />}
                
                {/* Only show results if not loading and there's something to show */}
                {!isLoading && characterImage && characterBackstory && (
                    <ResultsDisplay image={characterImage} backstory={characterBackstory} />
                )}
            </div>
        </div>
    );
}

