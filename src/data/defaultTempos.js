// Domyślne tempa dla poszczególnych podgatunków muzycznych (w BPM)
const defaultTempos = {
    // Rock
    'standard-rock': 120,
    'hard-rock': 130,
    'progressive-rock': 115,
    'indie-rock': 118,
  
    // Pop
    'standard-pop': 120,
    'dance-pop': 128,
    'rnb-pop': 95,
    'country-pop': 110,
  
    // Jazz
    'standard-jazz': 130,
    'bebop': 160,
    'fusion': 120,
    'swing': 145,
  
    // Blues
    'standard-blues': 85,
    'delta-blues': 80,
    'chicago-blues': 90,
    'jazz-blues': 100,
  
    // Electronic
    'house': 128,
    'techno': 140,
    'trance': 138,
    'drum-and-bass': 174,
    'ambient': 85,
    'dubstep': 140,
  
    // Classical
    'standard-classical': 100,
    'baroque': 110,
    'romantic': 90,
    'impressionism': 84,
  
    // Folk
    'standard-folk': 100,
    'irish-folk': 120,
    'bluegrass': 125,
    'nordic-folk': 90
  };
  
  // Funkcja do pobierania domyślnego tempa dla podgatunku
  export const getDefaultTempoForSubGenre = (subGenreId) => {
    return defaultTempos[subGenreId] || 120; // Domyślnie 120 BPM, jeśli nie znaleziono
  };
  
  export default defaultTempos;