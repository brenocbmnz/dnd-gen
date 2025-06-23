import React from 'react';
import Header from '../components/Header';
import CharacterForm from '../components/CharacterForm';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import ResultsDisplay from '../components/ResultsDisplay';

// This component now encapsulates the entire character creation flow.
const CharacterCreationPage = ({ 
  handleGeneration, 
  isLoading, 
  error, 
  characterImage, 
  characterBackstory 
}) => {
  return (
    <>
      <Header />
      <CharacterForm onGenerate={handleGeneration} isLoading={isLoading} />
      
      {isLoading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}
      
      {!isLoading && characterImage && characterBackstory && (
          <ResultsDisplay image={characterImage} backstory={characterBackstory} />
      )}
    </>
  );
};

export default CharacterCreationPage;