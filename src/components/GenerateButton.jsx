import React from 'react';
import { useAppContext } from '../context/AppContext';
import useMelodyGenerator from '../hooks/useMelodyGenerator';

const GenerateButton = () => {
  const { selectedGenre, selectedSubGenre, selectedKey } = useAppContext();
  const { generateNewMelody, isGenerating, error } = useMelodyGenerator();

  const isDisabled = !selectedGenre || !selectedSubGenre || !selectedKey || isGenerating;

  return (
    <div className="generate-button-container">
      <button
        className="generate-button"
        onClick={generateNewMelody}
        disabled={isDisabled}
      >
        {isGenerating ? 'Generowanie...' : 'Wygeneruj melodię'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default GenerateButton;