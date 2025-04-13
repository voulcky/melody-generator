// Baza wszystkich nut
const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Typy skal wraz z ich wzorcami interwałów
const SCALE_PATTERNS = {
  major: [0, 2, 4, 5, 7, 9, 11], // Wzorzec interwałów skali durowej: whole, whole, half, whole, whole, whole, half
  minor: [0, 2, 3, 5, 7, 8, 10], // Wzorzec interwałów skali molowej naturalnej
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11], // Wzorzec interwałów skali molowej harmonicznej
  pentatonicMajor: [0, 2, 4, 7, 9], // Pentatonika durowa
  pentatonicMinor: [0, 3, 5, 7, 10], // Pentatonika molowa
  blues: [0, 3, 5, 6, 7, 10], // Skala bluesowa
  dorian: [0, 2, 3, 5, 7, 9, 10], // Skala doriańska
  mixolydian: [0, 2, 4, 5, 7, 9, 10], // Skala miksolidyjska
  lydian: [0, 2, 4, 6, 7, 9, 11], // Skala lidyjska
};

// Mapowanie nazw tonacji na nuty podstawowe i typ skali
const KEY_MAPPING = {
  // Tonacje durowe
  'C': { rootNote: 'C', scaleType: 'major' },
  'G': { rootNote: 'G', scaleType: 'major' },
  'D': { rootNote: 'D', scaleType: 'major' },
  'A': { rootNote: 'A', scaleType: 'major' },
  'E': { rootNote: 'E', scaleType: 'major' },
  'B': { rootNote: 'B', scaleType: 'major' },
  'F': { rootNote: 'F', scaleType: 'major' },
  'Bb': { rootNote: 'A#', scaleType: 'major' },
  'Eb': { rootNote: 'D#', scaleType: 'major' },
  'Ab': { rootNote: 'G#', scaleType: 'major' },
  'Db': { rootNote: 'C#', scaleType: 'major' },
  
  // Tonacje molowe
  'Am': { rootNote: 'A', scaleType: 'minor' },
  'Em': { rootNote: 'E', scaleType: 'minor' },
  'Bm': { rootNote: 'B', scaleType: 'minor' },
  'F#m': { rootNote: 'F#', scaleType: 'minor' },
  'C#m': { rootNote: 'C#', scaleType: 'minor' },
  'G#m': { rootNote: 'G#', scaleType: 'minor' },
  'Dm': { rootNote: 'D', scaleType: 'minor' },
  'Gm': { rootNote: 'G', scaleType: 'minor' },
  'Cm': { rootNote: 'C', scaleType: 'minor' },
  'Fm': { rootNote: 'F', scaleType: 'minor' },
  'Bbm': { rootNote: 'A#', scaleType: 'minor' },
  'Ebm': { rootNote: 'D#', scaleType: 'minor' },
  
  // Tonacje rozszerzone
  'Cmaj7': { rootNote: 'C', scaleType: 'major' },
  'Dmaj7': { rootNote: 'D', scaleType: 'major' },
  'Ebmaj7': { rootNote: 'D#', scaleType: 'major' },
  'Fmaj7': { rootNote: 'F', scaleType: 'major' },
  'Gmaj7': { rootNote: 'G', scaleType: 'major' },
  'Abmaj7': { rootNote: 'G#', scaleType: 'major' },
  'Bbmaj7': { rootNote: 'A#', scaleType: 'major' },
  
  // Tonacje z dominantą septymową (7)
  'C7': { rootNote: 'C', scaleType: 'mixolydian' },
  'D7': { rootNote: 'D', scaleType: 'mixolydian' },
  'E7': { rootNote: 'E', scaleType: 'mixolydian' },
  'F7': { rootNote: 'F', scaleType: 'mixolydian' },
  'G7': { rootNote: 'G', scaleType: 'mixolydian' },
  'A7': { rootNote: 'A', scaleType: 'mixolydian' },
  'B7': { rootNote: 'B', scaleType: 'mixolydian' },
  'Bb7': { rootNote: 'A#', scaleType: 'mixolydian' },
  'Eb7': { rootNote: 'D#', scaleType: 'mixolydian' },
  
  // Tonacje z septymą molową
  'Am7': { rootNote: 'A', scaleType: 'minor' },
  'Bm7': { rootNote: 'B', scaleType: 'minor' },
  'Cm7': { rootNote: 'C', scaleType: 'minor' },
  'Dm7': { rootNote: 'D', scaleType: 'minor' },
  'Em7': { rootNote: 'E', scaleType: 'minor' },
  'F#m7': { rootNote: 'F#', scaleType: 'minor' },
  
  // Inne specjalne tonacje
  'Cmaj7#11': { rootNote: 'C', scaleType: 'lydian' }
};

// Funkcja generująca skalę na podstawie nuty podstawowej i wzorca skali
const generateScale = (rootNote, scalePattern) => {
  const rootIndex = ALL_NOTES.indexOf(rootNote);
  if (rootIndex === -1) {
    throw new Error(`Nieznana nuta: ${rootNote}`);
  }
  
  return scalePattern.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    return ALL_NOTES[noteIndex];
  });
};

// Funkcja do konwersji ID klucza (np. "Cmaj7") na faktyczną skalę
export const getScaleFromKey = (keyId) => {
  const keyInfo = KEY_MAPPING[keyId];
  if (!keyInfo) {
    throw new Error(`Nieznana tonacja: ${keyId}`);
  }
  
  const { rootNote, scaleType } = keyInfo;
  const scalePattern = SCALE_PATTERNS[scaleType];
  
  if (!scalePattern) {
    throw new Error(`Nieznany typ skali: ${scaleType}`);
  }
  
  return generateScale(rootNote, scalePattern);
};

// Funkcja konwertująca nazwę nuty i oktawę na pełną nazwę nuty
export const getNoteWithOctave = (note, octave) => {
  return `${note}${octave}`;
};

// Funkcja generująca pełną skalę w określonym zakresie oktaw
export const getFullScale = (keyId, startOctave = 3, endOctave = 5) => {
  const scale = getScaleFromKey(keyId);
  const rootNote = KEY_MAPPING[keyId].rootNote;
  const rootIndex = ALL_NOTES.indexOf(rootNote);
  
  let fullScale = [];
  for (let octave = startOctave; octave <= endOctave; octave++) {
    const octaveScale = scale.map(note => `${note}${octave}`);
    fullScale = [...fullScale, ...octaveScale];
  }
  
  return fullScale;
};

// Eksportuj wszystkie potrzebne funkcje i stałe
export {
  ALL_NOTES,
  SCALE_PATTERNS,
  KEY_MAPPING,
  generateScale
};