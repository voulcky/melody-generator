import React, { createContext, useContext, useState } from 'react';

// Tworzenie kontekstu
const AppContext = createContext();

// Hook do łatwego używania kontekstu
export const useAppContext = () => useContext(AppContext);

// Provider kontekstu
export const AppProvider = ({ children }) => {
  // Stan dla wybranego gatunku, podgatunku, tonacji, tempa
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedSubGenre, setSelectedSubGenre] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [useDefaultTempo, setUseDefaultTempo] = useState(true);
  const [customTempo, setCustomTempo] = useState(120);
  
  // Stan dla wygenerowanej melodii
  const [melody, setMelody] = useState([]);
  
  // Stan odtwarzania
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);

  // Funkcja do ustawienia gatunku
  const selectGenre = (genre) => {
    setSelectedGenre(genre);
    setSelectedSubGenre(null); // Reset podgatunku przy zmianie gatunku
    setSelectedKey(null); // Reset tonacji
  };

  // Funkcja do ustawienia podgatunku
  const selectSubGenre = (subGenre) => {
    setSelectedSubGenre(subGenre);
    setSelectedKey(null); // Reset tonacji przy zmianie podgatunku
  };

  // Funkcja do ustawienia tonacji
  const selectKey = (key) => {
    setSelectedKey(key);
  };

  // Funkcje do zarządzania tempem
  const toggleDefaultTempo = () => {
    setUseDefaultTempo(!useDefaultTempo);
  };

  const setTempo = (tempo) => {
    setCustomTempo(tempo);
  };

  // Funkcja do ustawienia melodii
  const setGeneratedMelody = (newMelody) => {
    setMelody(newMelody);
    setCurrentNoteIndex(-1); // Reset indeksu odtwarzania
  };

  // Funkcje odtwarzania
  const startPlayback = () => {
    setIsPlaying(true);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentNoteIndex(-1);
  };

  const updateCurrentNote = (index) => {
    setCurrentNoteIndex(index);
  };

  // Wartość kontekstu do udostępnienia
  const contextValue = {
    selectedGenre,
    selectedSubGenre,
    selectedKey,
    useDefaultTempo,
    customTempo,
    melody,
    isPlaying,
    currentNoteIndex,
    selectGenre,
    selectSubGenre,
    selectKey,
    toggleDefaultTempo,
    setTempo,
    setGeneratedMelody,
    startPlayback,
    stopPlayback,
    updateCurrentNote
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};