import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getSubGenres } from '../data/genres';

const SubGenreSelector = () => {
  const { selectedGenre, selectedSubGenre, selectSubGenre } = useAppContext();

  // Pobierz dostępne podgatunki na podstawie wybranego gatunku
  const subGenres = selectedGenre ? getSubGenres(selectedGenre) : [];

  const handleSubGenreSelect = (subGenreId) => {
    selectSubGenre(subGenreId);
  };

  if (!selectedGenre) {
    return (
      <div className="selector-container">
        <h2>Podgatunek</h2>
        <p className="placeholder-text">Najpierw wybierz gatunek</p>
      </div>
    );
  }

  return (
    <div className="selector-container">
      <h2>Podgatunek</h2>
      <div className="subgenre-buttons">
        {subGenres.map((subGenre) => (
          <button
            key={subGenre.id}
            className={`subgenre-button ${selectedSubGenre === subGenre.id ? 'active' : ''}`}
            onClick={() => handleSubGenreSelect(subGenre.id)}
          >
            {subGenre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubGenreSelector;