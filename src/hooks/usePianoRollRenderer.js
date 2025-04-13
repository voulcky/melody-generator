import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { PIANO_ROLL_SETTINGS } from '../utils/constants';

const usePianoRollRenderer = (melody, currentNoteIndex) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Funkcja do inicjalizacji wizualizacji
  const initializeVisualization = (container) => {
    if (!container) return;
    
    // Pobierz wymiary kontenera
    const { width, height } = container.getBoundingClientRect();
    setDimensions({ width, height });
    
    // Utwórz element SVG, jeśli jeszcze nie istnieje
    if (!svgRef.current) {
      const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
      
      // Dodaj grupę na klawiaturę
      svg.append('g')
        .attr('class', 'keyboard')
        .attr('transform', `translate(0, 0)`);
      
      // Dodaj grupę na siatkę
      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(${PIANO_ROLL_SETTINGS.keyboardWidth}, 0)`);
      
      // Dodaj grupę na nuty
      svg.append('g')
        .attr('class', 'notes')
        .attr('transform', `translate(${PIANO_ROLL_SETTINGS.keyboardWidth}, 0)`);
      
      svgRef.current = svg;
    }
  };
  
  // Funkcja do aktualizacji wizualizacji
  const updateVisualization = (newMelody) => {
    if (!svgRef.current || !newMelody || newMelody.length === 0) return;
    
    // Przygotuj dane
    const allNotes = extractUniqueNotes(newMelody);
    const totalDuration = calculateTotalDuration(newMelody);
    
    // Aktualizuj klawiaturę
    renderKeyboard(svgRef.current, allNotes);
    
    // Aktualizuj siatkę
    renderGrid(svgRef.current, totalDuration, allNotes.length);
    
    // Aktualizuj nuty
    renderNotes(svgRef.current, newMelody, allNotes);
  };
  
  // Funkcja do podświetlania aktualnie odtwarzanej nuty
  const highlightNote = (index) => {
    if (!svgRef.current) return;
    
    // Zresetuj wszystkie podświetlenia
    svgRef.current.selectAll('.note')
      .classed('playing', false)
      .attr('opacity', 0.7);
    
    // Podświetl aktualną nutę
    if (index >= 0) {
      svgRef.current.select(`.note-${index}`)
        .classed('playing', true)
        .attr('opacity', 1);
    }
  };
  
  // Aktualizacja wizualizacji przy zmianie melodii
  useEffect(() => {
    if (melody && melody.length > 0) {
      updateVisualization(melody);
    }
  }, [melody]);
  
  // Podświetlenie aktualnie odtwarzanej nuty
  useEffect(() => {
    highlightNote(currentNoteIndex);
  }, [currentNoteIndex]);
  
  return {
    svgRef,
    initializeVisualization,
    updateVisualization,
    highlightNote
  };
};

// Funkcja do wyodrębniania unikalnych nut z melodii
const extractUniqueNotes = (melody) => {
  const allNoteNames = melody.map(note => note.note);
  const uniqueNoteNames = [...new Set(allNoteNames)];
  
  // Sortuj nuty od najniższej do najwyższej
  return uniqueNoteNames.sort((a, b) => {
    const getOctave = (note) => parseInt(note.match(/\d+/)[0], 10);
    const getNoteName = (note) => note.replace(/\d+/g, '');
    
    const aOctave = getOctave(a);
    const bOctave = getOctave(b);
    
    if (aOctave !== bOctave) {
      return bOctave - aOctave; // Odwrócona kolejność - najwyższe oktawy na górze
    }
    
    const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return noteOrder.indexOf(getNoteName(a)) - noteOrder.indexOf(getNoteName(b));
  });
};

// Funkcja do obliczania całkowitej długości melodii
const calculateTotalDuration = (melody) => {
  if (!melody || melody.length === 0) return 0;
  
  const lastNote = melody[melody.length - 1];
  return lastNote.startTime + lastNote.duration;
};

// Funkcja do renderowania klawiatury
const renderKeyboard = (svg, allNotes) => {
  const keyboardGroup = svg.select('.keyboard');
  keyboardGroup.selectAll('*').remove();
  
  const keyboardWidth = PIANO_ROLL_SETTINGS.keyboardWidth;
  const noteHeight = PIANO_ROLL_SETTINGS.noteHeight;
  
  // Renderuj klawisze
  allNotes.forEach((note, index) => {
    const isBlackKey = note.includes('#');
    const keyColor = isBlackKey ? '#333' : '#fff';
    const strokeColor = isBlackKey ? '#000' : '#ccc';
    
    keyboardGroup
      .append('rect')
      .attr('x', 0)
      .attr('y', index * noteHeight)
      .attr('width', keyboardWidth)
      .attr('height', noteHeight)
      .attr('fill', keyColor)
      .attr('stroke', strokeColor)
      .attr('stroke-width', 1);
    
    // Dodaj etykietę nuty
    keyboardGroup
      .append('text')
      .attr('x', 5)
      .attr('y', index * noteHeight + noteHeight / 2 + 5)
      .attr('font-size', '10px')
      .attr('fill', isBlackKey ? '#fff' : '#333')
      .text(note);
  });
};

// Funkcja do renderowania siatki
const renderGrid = (svg, totalDuration, totalNotes) => {
  const gridGroup = svg.select('.grid');
  gridGroup.selectAll('*').remove();
  
  const noteHeight = PIANO_ROLL_SETTINGS.noteHeight;
  const pixelsPerBeat = PIANO_ROLL_SETTINGS.pixelsPerBeat;
  
  const gridWidth = totalDuration * pixelsPerBeat;
  const gridHeight = totalNotes * noteHeight;
  
  // Renderuj tło siatki
  gridGroup
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', gridWidth)
    .attr('height', gridHeight)
    .attr('fill', '#1e1e1e');
  
  // Renderuj linie poziome (nuty)
  for (let i = 0; i <= totalNotes; i++) {
    gridGroup
      .append('line')
      .attr('x1', 0)
      .attr('y1', i * noteHeight)
      .attr('x2', gridWidth)
      .attr('y2', i * noteHeight)
      .attr('stroke', '#333')
      .attr('stroke-width', 1);
  }
  
  // Renderuj linie pionowe (takty)
  for (let i = 0; i <= totalDuration; i++) {
    const isMainBeat = i % 4 === 0;
    
    gridGroup
      .append('line')
      .attr('x1', i * pixelsPerBeat)
      .attr('y1', 0)
      .attr('x2', i * pixelsPerBeat)
      .attr('y2', gridHeight)
      .attr('stroke', isMainBeat ? '#555' : '#333')
      .attr('stroke-width', isMainBeat ? 1.5 : 1);
  }
};

// Funkcja do renderowania nut
const renderNotes = (svg, melody, allNotes) => {
  const notesGroup = svg.select('.notes');
  notesGroup.selectAll('*').remove();
  
  const noteHeight = PIANO_ROLL_SETTINGS.noteHeight;
  const pixelsPerBeat = PIANO_ROLL_SETTINGS.pixelsPerBeat;
  
  // Renderuj każdą nutę
  melody.forEach((note, index) => {
    // Znajdź indeks nuty na liście wszystkich nut
    const noteIndex = allNotes.indexOf(note.note);
    
    // Oblicz pozycję i wymiary prostokąta nuty
    const x = note.startTime * pixelsPerBeat;
    const y = noteIndex * noteHeight;
    const width = note.duration * pixelsPerBeat;
    
    // Dodaj prostokąt nuty
    notesGroup
      .append('rect')
      .attr('class', `note note-${index}`)
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', noteHeight)
      .attr('fill', '#4a9eff')
      .attr('stroke', '#2a79df')
      .attr('stroke-width', 1)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('opacity', 0.7);
  });
};

export default usePianoRollRenderer;