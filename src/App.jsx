import React, { useState } from 'react';
import { generateImage, generateBackstory } from './api/generatorService';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CharacterCreationPage from './pages/CharacterCreationPage';
import QuickPromptPage from './pages/QuickPromptPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
    // State for navigation
    const [currentPage, setCurrentPage] = useState('home');
    const [initialFormData, setInitialFormData] = useState(null);

    // State for character creation
    const [characterImage, setCharacterImage] = useState('');
    const [characterBackstory, setCharacterBackstory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Read API Key from .env file
    const API_KEY = import.meta.env.VITE_API_KEY;

    const handleGeneration = async ({ name, age, race, charClass, description, pronouns }) => {
        if (!API_KEY) {
            setError("Configuration error: API Key is missing. Check .env file.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setCharacterImage('');
        setCharacterBackstory('');

        try {
            const imagePrompt = `Epic fantasy character portrait of ${name}, a ${age}-year-old ${race} ${charClass}. ${description}. Cinematic lighting, detailed, digital painting, artstation, concept art.`;
            const backstoryPrompt = `Write a short, compelling Dungeons and Dragons backstory for a character named ${name}, who is ${age} years old. Their pronouns are ${pronouns}. Be creative and give them a unique motivation or a defining past event. The character is a ${race} ${charClass} who ${description}.`;
            
            const [imageResponse, backstoryResponse] = await Promise.all([
                generateImage(imagePrompt, API_KEY),
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

    // This function takes the data from the quick prompt and immediately starts the full generation
    const handleQuickCreateCharacter = (characterData) => {
        setInitialFormData(characterData);
        setCurrentPage('character-creation');
        handleGeneration(characterData); // Immediately trigger the generation
    };

    const renderPage = () => {
      switch (currentPage) {
        case 'character-creation':
          return (
            <CharacterCreationPage
              handleGeneration={handleGeneration}
              isLoading={isLoading}
              error={error}
              characterImage={characterImage}
              characterBackstory={characterBackstory}
              initialData={initialFormData}
            />
          );
        case 'quick-prompt':
          return <QuickPromptPage apiKey={API_KEY} onGenerateFullCharacter={handleQuickCreateCharacter} />;
        case 'about':
          return <AboutPage />;
        case 'contact':
            return <ContactPage />;
        case 'home':
        default:
          return <HomePage onNavClick={setCurrentPage} />;
      }
    };

    return (
        <div data-theme="night" className="min-h-screen flex flex-col">
            <header className="bg-base-200 shadow-lg">
              <div className="container mx-auto max-w-6xl">
                <Navigation currentPage={currentPage} onNavClick={setCurrentPage} />
              </div>
            </header>
            <main className="flex-grow container mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
              {renderPage()}
            </main>
            <footer className="bg-base-200">
              <div className="container mx-auto max-w-6xl">
                <Footer onNavClick={setCurrentPage} />
              </div>
            </footer>
        </div>
    );
}
