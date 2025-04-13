import React from 'react';
import { useAppContext } from '../context/AppContext';
import genres from '../data/genres';

const GenreSelector = () => {
  const { selectedGenre, selectGenre } = useAppContext();

  const handleGenreSelect = (genreId) => {
    selectGenre(genreId);
  };

  return (
    <div className="selector-container">
      <h2>Gatunek muzyczny</h2>
      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-button ${selectedGenre === genre.id ? 'active' : ''}`}
            onClick={() => handleGenreSelect(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;