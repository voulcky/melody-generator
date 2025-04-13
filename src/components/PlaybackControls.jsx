import React from 'react';
import { useAppContext } from '../context/AppContext';
import useTonePlayer from '../hooks/useTonePlayer';

const PlaybackControls = () => {
  const { melody, isPlaying } = useAppContext();
  const { play, stop, isReady } = useTonePlayer();

  const handlePlayClick = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  return (
    <div className="playback-controls">
      <button
        className={`playback-button ${isPlaying ? 'stop' : 'play'}`}
        onClick={handlePlayClick}
        disabled={!melody || melody.length === 0 || !isReady}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
};

export default PlaybackControls;