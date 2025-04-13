import { NOTE_DURATIONS } from '../../utils/constants';

// Charakterystyki dla podgatunków muzyki elektronicznej
const subGenreCharacteristics = {
  'house': {
    preferredIntervals: [-2, -1, 0, 1, 2, 3, 4], // Preferowane interwały melodyczne
    noteDurationWeights: {
      // Wagi długości nut (im wyższa liczba, tym większa szansa na wybranie)
      whole: 0,
      half: 1,
      quarter: 5,
      eighth: 10,
      sixteenth: 5
    },
    rhythmPatterns: [
      // Typowe wzorce rytmiczne dla House
      [1, 0, 0, 1, 0, 1, 0, 0], // 1 oznacza akcent, 0 brak akcentu
      [1, 0, 1, 0, 1, 0, 1, 0]
    ],
    velocityRange: [0.6, 0.9], // Zakres głośności nut (velocity)
    startingNotePreference: 'root', // Preferowana pierwsza nuta
    useGhostNotes: false,
    applySwing: false,
    swingAmount: 0
  },
  'techno': {
    preferredIntervals: [-3, -2, -1, 0, 1, 2, 3], // Bardziej skoczne, większe interwały
    noteDurationWeights: {
      whole: 0,
      half: 0,
      quarter: 2,
      eighth: 8,
      sixteenth: 10
    },
    rhythmPatterns: [
      // Typowe wzorce rytmiczne dla Techno - bardziej mechaniczne
      [1, 0, 1, 0, 1, 0, 1, 0],
      [1, 0, 0, 1, 0, 0, 1, 0]
    ],
    velocityRange: [0.7, 0.9],
    startingNotePreference: 'fifth',
    useGhostNotes: false,
    applySwing: false,
    swingAmount: 0
  },
  'trance': {
    preferredIntervals: [-5, -3, -1, 0, 1, 3, 5, 7], // Duże, emocjonalne skoki
    noteDurationWeights: {
      whole: 1,
      half: 3,
      quarter: 8,
      eighth: 5,
      sixteenth: 2
    },
    rhythmPatterns: [
      // Typowe wzorce rytmiczne dla Trance
      [1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 1, 0]
    ],
    velocityRange: [0.5, 1.0], // Duże zróżnicowanie dynamiki
    startingNotePreference: 'root',
    useGhostNotes: false,
    applySwing: false,
    swingAmount: 0
  },
  'drum-and-bass': {
    preferredIntervals: [-7, -5, -2, -1, 0, 1, 2, 5, 7], // Bardzo zróżnicowane interwały
    noteDurationWeights: {
      whole: 0,
      half: 0,
      quarter: 2,
      eighth: 8,
      sixteenth: 10
    },
    rhythmPatterns: [
      // Typowe wzorce rytmiczne dla Drum and Bass
      [1, 0, 0, 1, 0, 0, 1, 1],
      [1, 1, 0, 1, 0, 1, 0, 0]
    ],
    velocityRange: [0.6, 1.0],
    startingNotePreference: 'random',
    useGhostNotes: true, // Używa ghost notes dla bardziej dynamicznego brzmienia
    applySwing: false,
    swingAmount: 0
  },
  'ambient': {
    preferredIntervals: [-12, -7, -5, -3, 0, 3, 5, 7, 12], // Duże, przestrzenne interwały
    noteDurationWeights: {
      whole: 5,
      half: 10,
      quarter: 5,
      eighth: 2,
      sixteenth: 0
    },
    rhythmPatterns: [
      // Ambient ma bardziej płynny, mniej strukturyzowany rytm
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0]
    ],
    velocityRange: [0.3, 0.7], // Cichsze, subtelniejsze nuty
    startingNotePreference: 'third', // Często zaczyna od tercji dla miękkiego brzmienia
    useGhostNotes: false,
    applySwing: false,
    swingAmount: 0
  },
  'dubstep': {
    preferredIntervals: [-12, -7, -5, -2, 0, 2, 5, 7, 12], // Dramatyczne skoki
    noteDurationWeights: {
      whole: 1,
      half: 3,
      quarter: 8,
      eighth: 7,
      sixteenth: 2
    },
    rhythmPatterns: [
      // Typowe wzorce rytmiczne dla Dubstep
      [1, 0, 0, 1, 0, 0, 1, 0],
      [1, 0, 1, 0, 0, 1, 0, 0]
    ],
    velocityRange: [0.5, 1.0], // Duże zróżnicowanie dynamiki
    startingNotePreference: 'root',
    useGhostNotes: false,
    applySwing: false,
    swingAmount: 0
  }
};

// Funkcja do pobierania charakterystyk dla podgatunku
export const getSubGenreCharacteristics = (subGenre) => {
  return subGenreCharacteristics[subGenre] || null;
};

// Funkcja do modyfikacji melodii specyficzna dla elektroniki
export const applyElectronicEffects = (melody, subGenre) => {
  switch(subGenre) {
    case 'trance':
      // Dla trance'u - dodaj efekt gate'a - regularnych przerw w brzmieniu
      return applyGateEffect(melody);
    case 'dubstep':
      // Dla dubstepu - dodaj efekt wooble basu
      return applyWobbleEffect(melody);
    default:
      return melody;
  }
};

// Funkcja dodająca efekt gate'a (używane w trance)
const applyGateEffect = (melody) => {
  return melody.map((note, index) => {
    // Co drugą nutę urwij wcześniej - efekt gate'a
    if (index % 2 === 1) {
      return {
        ...note,
        duration: note.duration * 0.6
      };
    }
    return note;
  });
};

// Funkcja dodająca efekt wobble (używane w dubstep)
const applyWobbleEffect = (melody) => {
  return melody.map((note, index) => {
    // Moduluj głośność nut, aby symulować efekt wobble
    const modulationFactor = 0.5 + 0.5 * Math.sin(index * Math.PI / 2);
    return {
      ...note,
      velocity: note.velocity * modulationFactor
    };
  });
};