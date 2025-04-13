import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getKeysForSubGenre } from '../data/keys';

const KeySelector = () => {
  const { selectedSubGenre, selectedKey, selectKey } = useAppContext();

  // Pobierz dostępne tonacje na podstawie wybranego podgatunku
  const keys = selectedSubGenre ? getKeysForSubGenre(selectedSubGenre) : [];

  const handleKeySelect = (keyId) => {
    selectKey(keyId);
  };

  if (!selectedSubGenre) {
    return (
      <div className="selector-container">
        <h2>Tonacja</h2>
        <p className="placeholder-text">Najpierw wybierz podgatunek</p>
      </div>
    );
  }

  return (
    <div className="selector-container">
      <h2>Tonacja</h2>
      <div className="key-buttons">
        {keys.map((key) => (
          <button
            key={key.id}
            className={`key-button ${selectedKey === key.id ? 'active' : ''}`}
            onClick={() => handleKeySelect(key.id)}
          >
            {key.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeySelector;