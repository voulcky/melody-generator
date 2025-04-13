import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import usePianoRollRenderer from '../hooks/usePianoRollRenderer';
import '../styles/components/PianoRoll.css';

const PianoRoll = () => {
  const { melody, currentNoteIndex } = useAppContext();
  const containerRef = useRef(null);
  const { initializeVisualization, updateVisualization } = usePianoRollRenderer(melody, currentNoteIndex);
  
  // Inicjalizacja wizualizacji po zamontowaniu komponentu
  useEffect(() => {
    if (containerRef.current) {
      initializeVisualization(containerRef.current);
    }
  }, [initializeVisualization]);
  
  // Aktualizacja wizualizacji gdy melodia się zmienia
  useEffect(() => {
    if (melody && melody.length > 0) {
      updateVisualization(melody);
    }
  }, [melody, updateVisualization]);
  
  return (
    <div className="piano-roll-component">
      <h2>Piano Roll</h2>
      {melody && melody.length > 0 ? (
        <div className="piano-roll" ref={containerRef}></div>
      ) : (
        <div className="empty-piano-roll">
          <p>Wygeneruj melodię, aby zobaczyć ją na piano roll</p>
        </div>
      )}
    </div>
  );
};

export default PianoRoll;