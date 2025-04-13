import { getScaleFromKey, getFullScale } from '../utils/scales';
import { transposeNote, getFrequency } from '../utils/notes';
import { MELODY_LENGTH, DEFAULT_VELOCITY, NOTE_DURATIONS } from '../utils/constants';

// Importuj wzorce dla poszczególnych gatunków
import * as rockPatterns from './genrePatterns/rock';
import * as popPatterns from './genrePatterns/pop';
import * as jazzPatterns from './genrePatterns/jazz';
import * as bluesPatterns from './genrePatterns/blues';
import * as electronicPatterns from './genrePatterns/electronic';
import * as classicalPatterns from './genrePatterns/classical';
import * as folkPatterns from './genrePatterns/folk';

// Mapowanie gatunków na odpowiednie moduły z wzorcami
const genreModules = {
  rock: rockPatterns,
  pop: popPatterns,
  jazz: jazzPatterns,
  blues: bluesPatterns,
  electronic: electronicPatterns,
  classical: classicalPatterns,
  folk: folkPatterns
};

// Funkcja pomocnicza do losowego wyboru elementu z tablicy
const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Główna funkcja generująca melodię
export const generateMelody = (genre, subGenre, key, tempo) => {
  // Pobierz moduł z wzorcami dla danego gatunku
  const genreModule = genreModules[genre];
  if (!genreModule) {
    throw new Error(`Nieznany gatunek: ${genre}`);
  }
  
  // Pobierz charakterystyki dla podgatunku
  const subGenreCharacteristics = genreModule.getSubGenreCharacteristics(subGenre);
  if (!subGenreCharacteristics) {
    throw new Error(`Nieznany podgatunek: ${subGenre}`);
  }
  
  // Pobierz pełną skalę dla wybranej tonacji
  const fullScale = getFullScale(key, 3, 5);
  
  // Określ domyślne parametry dla podgatunku
  const {
    preferredIntervals,
    noteDurationWeights,
    rhythmPatterns,
    velocityRange,
    startingNotePreference
  } = subGenreCharacteristics;
  
  // Tablica na wygenerowaną melodię
  let melody = [];
  let currentTime = 0;
  
  // Wybierz pierwszą nutę (często tonika)
  let currentNoteIndex = determineStartingNoteIndex(fullScale, startingNotePreference);
  let currentNote = fullScale[currentNoteIndex];
  
  // Generuj melodię o długości MELODY_LENGTH
  for (let i = 0; i < MELODY_LENGTH; i++) {
    // Wybierz losowy interwał na podstawie preferowanych interwałów dla podgatunku
    const interval = getRandomElement(preferredIntervals);
    
    // Oblicz następną nutę na podstawie interwału
    const nextNoteIndex = calculateNextNoteIndex(currentNoteIndex, interval, fullScale.length);
    currentNoteIndex = nextNoteIndex;
    currentNote = fullScale[currentNoteIndex];
    
    // Wybierz długość nuty na podstawie wag dla podgatunku
    const duration = selectNoteDuration(noteDurationWeights);
    
    // Wybierz głośność nuty (velocity)
    const velocity = selectNoteVelocity(velocityRange, i);
    
    // Dodaj nutę do melodii
    melody.push({
      note: currentNote,
      frequency: getFrequency(currentNote),
      duration: duration,
      velocity: velocity,
      startTime: currentTime
    });
    
    // Zwiększ czas
    currentTime += duration;
  }
  
  // Zastosuj dodatkowe poprawki specyficzne dla gatunku (np. rytm, akcenty)
  melody = applyGenreSpecificAdjustments(melody, subGenreCharacteristics, tempo);
  
  return melody;
};

// Funkcja do określania początkowego indeksu nuty
const determineStartingNoteIndex = (scale, preference) => {
  // W zależności od preferencji, wybierz różne nuty początkowe
  switch(preference) {
    case 'root':
      // Wybierz tonikę (pierwszą nutę skali)
      return 0;
    case 'fifth':
      // Wybierz kwintę (piątą nutę skali)
      return scale.length >= 5 ? 4 : 0;
    case 'third':
      // Wybierz tercję (trzecią nutę skali)
      return scale.length >= 3 ? 2 : 0;
    case 'random':
    default:
      // Wybierz losową nutę ze skali
      return Math.floor(Math.random() * scale.length);
  }
};

// Funkcja do obliczania indeksu następnej nuty na podstawie interwału
const calculateNextNoteIndex = (currentIndex, interval, scaleLength) => {
  let nextIndex = currentIndex + interval;
  
  // Utrzymaj indeks w granicach skali
  while (nextIndex >= scaleLength) {
    nextIndex -= scaleLength;
  }
  while (nextIndex < 0) {
    nextIndex += scaleLength;
  }
  
  return nextIndex;
};

// Funkcja do wyboru długości nuty na podstawie wag dla podgatunku
const selectNoteDuration = (durationWeights) => {
  // Utwórz tablicę możliwych długości nut na podstawie wag
  let options = [];
  
  for (const [duration, weight] of Object.entries(durationWeights)) {
    for (let i = 0; i < weight; i++) {
      options.push(NOTE_DURATIONS[duration]);
    }
  }
  
  return getRandomElement(options);
};

// Funkcja do wyboru głośności nuty
const selectNoteVelocity = (velocityRange, position) => {
  const [min, max] = velocityRange;
  
  // Główny akcent na pierwszą nutę w takcie
  if (position % 4 === 0) {
    return Math.min(1, max * 1.1); // Zwiększ głośność o 10%, ale max 1
  }
  
  // Lekki akcent na trzecią nutę w takcie
  if (position % 4 === 2) {
    return (min + max) / 2; // Średnia głośność
  }
  
  // Pozostałe nuty z losową głośnością z zakresu
  return min + Math.random() * (max - min);
};

// Funkcja do stosowania specyficznych poprawek dla gatunku
const applyGenreSpecificAdjustments = (melody, characteristics, tempo) => {
  let adjustedMelody = [...melody];
  
  // Przykładowe poprawki:
  
  // 1. Aplikuj wzorce rytmiczne (np. swing w jazzie)
  if (characteristics.applySwing && characteristics.swingAmount > 0) {
    adjustedMelody = applySwing(adjustedMelody, characteristics.swingAmount);
  }
  
  // 2. Aplikuj specyficzne dla gatunku efekty (np. ghost notes w funk)
  if (characteristics.useGhostNotes) {
    adjustedMelody = addGhostNotes(adjustedMelody);
  }
  
  // 3. Dostosuj timing w zależności od tempa (przy szybszych tempach więcej legato)
  if (tempo > 140) {
    adjustedMelody = adjustArticulation(adjustedMelody, 'legato');
  } else if (tempo < 90) {
    adjustedMelody = adjustArticulation(adjustedMelody, 'staccato');
  }
  
  return adjustedMelody;
};

// Funkcja do stosowania swingu (używana w jazzie, bluesie)
const applySwing = (melody, swingAmount) => {
  return melody.map((note, index) => {
    // Aplikuj swing tylko do nut o parzystych indeksach (drugiej, czwartej, itd.)
    if (index % 2 === 1 && note.duration <= NOTE_DURATIONS.eighth) {
      return {
        ...note,
        startTime: note.startTime + (note.duration * swingAmount)
      };
    }
    return note;
  });
};

// Funkcja do dodawania ghost notes (używana w funk, jazz)
const addGhostNotes = (melody) => {
  return melody.map((note, index) => {
    // Losowo wybieraj niektóre nuty jako ghost notes (cichsze)
    if (Math.random() < 0.2 && index % 4 !== 0) { // Nie stosuj do pierwszej nuty w takcie
      return {
        ...note,
        velocity: note.velocity * 0.5 // Zmniejsz głośność o połowę
      };
    }
    return note;
  });
};

// Funkcja do dostosowywania artykulacji (legato/staccato)
const adjustArticulation = (melody, articulationType) => {
  const sustainFactor = articulationType === 'legato' ? 0.95 : 0.5;
  
  return melody.map(note => ({
    ...note,
    // Dla legato - nuty prawie się stykają, dla staccato - krótsze
    sustain: note.duration * sustainFactor
  }));
};

export default generateMelody;