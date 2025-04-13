import { useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import generateMelody from '../algorithm/melodyGenerator';
import { getDefaultTempoForSubGenre } from '../data/defaultTempos';

const useMelodyGenerator = () => {
  const {
    selectedGenre,
    selectedSubGenre,
    selectedKey,
    useDefaultTempo,
    customTempo,
    setGeneratedMelody
  } = useAppContext();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  
  // Funkcja do generowania melodii
  const generateNewMelody = useCallback(async () => {
    // Resetuj błędy
    setError(null);
    
    // Sprawdź czy wszystkie wymagane parametry są wybrane
    if (!selectedGenre || !selectedSubGenre || !selectedKey) {
      setError('Proszę wybrać gatunek, podgatunek i tonację przed generowaniem melodii');
      return;
    }
    
    try {
      setIsGenerating(true);
      
      // Ustal tempo - domyślne lub niestandardowe
      const tempo = useDefaultTempo 
        ? getDefaultTempoForSubGenre(selectedSubGenre)
        : customTempo;
      
      // Wygeneruj melodię
      const newMelody = generateMelody(
        selectedGenre,
        selectedSubGenre,
        selectedKey,
        tempo
      );
      
      // Zaktualizuj melodię w kontekście aplikacji
      setGeneratedMelody(newMelody);
      
      setIsGenerating(false);
    } catch (err) {
      console.error('Błąd podczas generowania melodii:', err);
      setError(`Błąd podczas generowania melodii: ${err.message}`);
      setIsGenerating(false);
    }
  }, [
    selectedGenre,
    selectedSubGenre,
    selectedKey,
    useDefaultTempo,
    customTempo,
    setGeneratedMelody
  ]);
  
  return {
    generateNewMelody,
    isGenerating,
    error
  };
};

export default useMelodyGenerator;