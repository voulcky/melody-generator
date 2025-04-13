// Stałe dla aplikacji

// Zakres BPM dla slidera tempa
export const MIN_TEMPO = 60;
export const MAX_TEMPO = 200;

// Domyślna długość melodii (liczba nut)
export const MELODY_LENGTH = 16;

// Domyślna oktawa startowa i końcowa
export const DEFAULT_START_OCTAVE = 3;
export const DEFAULT_END_OCTAVE = 5;

// Kolory dla różnych gatunków muzycznych (do wyróżniania na piano roll)
export const GENRE_COLORS = {
  rock: '#e74c3c',
  pop: '#3498db',
  jazz: '#9b59b6',
  blues: '#2980b9',
  electronic: '#1abc9c',
  classical: '#f1c40f',
  folk: '#e67e22'
};

// Predefiniowane długości nut (w ćwierćnutach)
export const NOTE_DURATIONS = {
  whole: 4,
  half: 2,
  quarter: 1,
  eighth: 0.5,
  sixteenth: 0.25
};

// Domyślna velocity (głośność) nuty (0-1)
export const DEFAULT_VELOCITY = 0.7;

// Domyślny czas sustain dla nut
export const DEFAULT_SUSTAIN = 0.7; // 70% długości nuty

// Wymiary piano roll
export const PIANO_ROLL_SETTINGS = {
  keyboardWidth: 50,
  noteHeight: 20,
  pixelsPerBeat: 60
};