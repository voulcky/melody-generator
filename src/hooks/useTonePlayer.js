import { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import { useAppContext } from '../context/AppContext';

const useTonePlayer = () => {
  const { melody, isPlaying, startPlayback, stopPlayback, updateCurrentNote } = useAppContext();
  const [synth, setSynth] = useState(null);
  const [part, setPart] = useState(null);
  
  // Inicjalizacja syntezatora Tone.js
  useEffect(() => {
    // Utwórz syntezator z odpowiednimi parametrami
    const newSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();
    
    setSynth(newSynth);
    
    // Cleanup przy odmontowaniu komponentu
    return () => {
      if (newSynth) {
        newSynth.dispose();
      }
    };
  }, []);
  
  // Aktualizacja części (part) przy zmianie melodii
  useEffect(() => {
    if (!synth || !melody || melody.length === 0) return;
    
    // Zatrzymaj poprzednią część jeśli istnieje
    if (part) {
      part.dispose();
    }
    
    // Utwórz nową część z melodią
    const events = melody.map((note, index) => ({
      time: note.startTime,
      note: note.note,
      velocity: note.velocity,
      duration: note.duration,
      index: index
    }));
    
    const newPart = new Tone.Part((time, value) => {
      // Graj nutę
      synth.triggerAttackRelease(
        value.note,
        value.duration,
        time,
        value.velocity
      );
      
      // Aktualizuj indeks aktualnie granej nuty
      Tone.Draw.schedule(() => {
        updateCurrentNote(value.index);
      }, time);
    }, events);
    
    // Ustaw parametry części
    newPart.loop = false;
    newPart.loopEnd = melody[melody.length - 1].startTime + melody[melody.length - 1].duration;
    
    // Dodaj zdarzenie zakończenia części
    const endTime = melody[melody.length - 1].startTime + melody[melody.length - 1].duration;
    Tone.Transport.schedule(() => {
      stopPlayback();
    }, endTime);
    
    setPart(newPart);
  }, [melody, synth, stopPlayback, updateCurrentNote]);
  
  // Aktualizacja stanu odtwarzania
  useEffect(() => {
    if (!part) return;
    
    if (isPlaying) {
      // Inicjalizuj kontekst audio (wymagane przez przeglądarki)
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
      
      // Rozpocznij odtwarzanie
      Tone.Transport.start();
      part.start(0);
    } else {
      // Zatrzymaj odtwarzanie
      Tone.Transport.stop();
      Tone.Transport.cancel();
      part.stop();
      updateCurrentNote(-1);
    }
  }, [isPlaying, part, updateCurrentNote]);
  
  // Funkcja do rozpoczęcia odtwarzania
  const play = useCallback(() => {
    if (!melody || melody.length === 0) return;
    
    // Zresetuj transport
    Tone.Transport.cancel();
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    
    startPlayback();
  }, [melody, startPlayback]);
  
  // Funkcja do zatrzymania odtwarzania
  const stop = useCallback(() => {
    stopPlayback();
  }, [stopPlayback]);
  
  return {
    play,
    stop,
    isReady: !!synth && !!part
  };
};

export default useTonePlayer;