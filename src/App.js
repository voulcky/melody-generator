import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import GenreSelector from './components/GenreSelector';
import SubGenreSelector from './components/SubGenreSelector';
import KeySelector from './components/KeySelector';
import TempoControl from './components/TempoControl';
import PianoRoll from './components/PianoRoll';
import PlaybackControls from './components/PlaybackControls';
import GenerateButton from './components/GenerateButton';
import './styles/App.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <div className="controls-container">
          <div className="selectors">
            <GenreSelector />
            <SubGenreSelector />
            <KeySelector />
            <TempoControl />
          </div>
          <GenerateButton />
        </div>
        <div className="piano-roll-container">
          <PianoRoll />
        </div>
        <PlaybackControls />
      </div>
    </AppProvider>
  );
}

export default App;