import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getDefaultTempoForSubGenre } from '../data/defaultTempos';
import { MIN_TEMPO, MAX_TEMPO } from '../utils/constants';

const TempoControl = () => {
  const { 
    selectedSubGenre, 
    useDefaultTempo, 
    customTempo, 
    toggleDefaultTempo, 
    setTempo 
  } = useAppContext();

  // Pobierz domyślne tempo dla wybranego podgatunku
  const defaultTempo = selectedSubGenre 
    ? getDefaultTempoForSubGenre(selectedSubGenre) 
    : 120;

  const handleTempoChange = (e) => {
    setTempo(Number(e.target.value));
  };

  const currentTempo = useDefaultTempo ? defaultTempo : customTempo;

  if (!selectedSubGenre) {
    return (
      <div className="tempo-container">
        <h2>Tempo</h2>
        <p className="placeholder-text">Najpierw wybierz podgatunek</p>
      </div>
    );
  }

  return (
    <div className="tempo-container">
      <h2>Tempo</h2>
      <div className="tempo-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={useDefaultTempo}
            onChange={toggleDefaultTempo}
          />
          <span className="slider round"></span>
        </label>
        <span>{useDefaultTempo ? 'Domyślne tempo' : 'Własne tempo'}</span>
      </div>
      
      <div className="tempo-control">
        {useDefaultTempo ? (
          <div className="default-tempo">
            <span>{defaultTempo} BPM</span>
            <p className="tempo-info">Standardowe tempo dla {selectedSubGenre}</p>
          </div>
        ) : (
          <div className="custom-tempo">
            <input
              type="range"
              min={MIN_TEMPO}
              max={MAX_TEMPO}
              step="1"
              value={customTempo}
              onChange={handleTempoChange}
              className="tempo-slider"
            />
            <span className="tempo-value">{customTempo} BPM</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TempoControl;