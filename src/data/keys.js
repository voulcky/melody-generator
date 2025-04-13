// Mapowanie podgatunków na odpowiednie tonacje
const subGenreKeys = {
    // Rock
    'standard-rock': [
      { id: 'E', name: 'E Major' },
      { id: 'A', name: 'A Major' },
      { id: 'D', name: 'D Major' },
      { id: 'G', name: 'G Major' },
      { id: 'Em', name: 'E Minor' }
    ],
    'hard-rock': [
      { id: 'E', name: 'E Major' },
      { id: 'A', name: 'A Major' },
      { id: 'D', name: 'D Major' },
      { id: 'Dm', name: 'D Minor' },
      { id: 'Em', name: 'E Minor' }
    ],
    'progressive-rock': [
      { id: 'Em', name: 'E Minor' },
      { id: 'Dm', name: 'D Minor' },
      { id: 'F#m', name: 'F# Minor' },
      { id: 'Cmaj7', name: 'C Major 7' },
      { id: 'Gmaj7', name: 'G Major 7' }
    ],
    'indie-rock': [
      { id: 'C', name: 'C Major' },
      { id: 'G', name: 'G Major' },
      { id: 'D', name: 'D Major' },
      { id: 'Em', name: 'E Minor' },
      { id: 'Am', name: 'A Minor' }
    ],
  
    // Pop
    'standard-pop': [
      { id: 'C', name: 'C Major' },
      { id: 'G', name: 'G Major' },
      { id: 'F', name: 'F Major' },
      { id: 'Am', name: 'A Minor' },
      { id: 'Em', name: 'E Minor' }
    ],
    'dance-pop': [
      { id: 'C', name: 'C Major' },
      { id: 'Am', name: 'A Minor' },
      { id: 'F', name: 'F Major' },
      { id: 'Gm', name: 'G Minor' },
      { id: 'Ebmaj7', name: 'Eb Major 7' }
    ],
    'rnb-pop': [
      { id: 'Dmaj7', name: 'D Major 7' },
      { id: 'Gmaj7', name: 'G Major 7' },
      { id: 'Ebmaj7', name: 'Eb Major 7' },
      { id: 'F#m7', name: 'F# Minor 7' },
      { id: 'Bm7', name: 'B Minor 7' }
    ],
    'country-pop': [
      { id: 'G', name: 'G Major' },
      { id: 'D', name: 'D Major' },
      { id: 'C', name: 'C Major' },
      { id: 'A', name: 'A Major' },
      { id: 'E', name: 'E Major' }
    ],
  
    // Jazz
    'standard-jazz': [
      { id: 'C7', name: 'C7' },
      { id: 'Cmaj7', name: 'C Major 7' },
      { id: 'Dm7', name: 'D Minor 7' },
      { id: 'Ebmaj7', name: 'Eb Major 7' },
      { id: 'G7', name: 'G7' }
    ],
    'bebop': [
      { id: 'F7', name: 'F7' },
      { id: 'Bb7', name: 'Bb7' },
      { id: 'Eb7', name: 'Eb7' },
      { id: 'Abmaj7', name: 'Ab Major 7' },
      { id: 'Cm7', name: 'C Minor 7' }
    ],
    'fusion': [
      { id: 'Dmaj7', name: 'D Major 7' },
      { id: 'Ebmaj7', name: 'Eb Major 7' },
      { id: 'Gmaj7', name: 'G Major 7' },
      { id: 'Cmaj7#11', name: 'C Major 7 #11' },
      { id: 'Am7', name: 'A Minor 7' }
    ],
    'swing': [
      { id: 'G7', name: 'G7' },
      { id: 'C7', name: 'C7' },
      { id: 'F7', name: 'F7' },
      { id: 'Bb7', name: 'Bb7' },
      { id: 'D7', name: 'D7' }
    ],
  
    // Blues
    'standard-blues': [
      { id: 'E7', name: 'E7' },
      { id: 'A7', name: 'A7' },
      { id: 'G7', name: 'G7' },
      { id: 'D7', name: 'D7' },
      { id: 'C7', name: 'C7' }
    ],
    'delta-blues': [
      { id: 'E7', name: 'E7' },
      { id: 'A7', name: 'A7' },
      { id: 'G7', name: 'G7' },
      { id: 'D7', name: 'D7' },
      { id: 'C7', name: 'C7' }
    ],
    'chicago-blues': [
      { id: 'A7', name: 'A7' },
      { id: 'E7', name: 'E7' },
      { id: 'G7', name: 'G7' },
      { id: 'D7', name: 'D7' },
      { id: 'Bb7', name: 'Bb7' }
    ],
    'jazz-blues': [
      { id: 'Bb7', name: 'Bb7' },
      { id: 'F7', name: 'F7' },
      { id: 'C7', name: 'C7' },
      { id: 'Eb7', name: 'Eb7' },
      { id: 'G7', name: 'G7' }
    ],
  
    // Electronic
    'house': [
      { id: 'Fm', name: 'F Minor' },
      { id: 'Abmaj7', name: 'Ab Major 7' },
      { id: 'Bbm', name: 'Bb Minor' },
      { id: 'Cm', name: 'C Minor' },
      { id: 'Ebmaj7', name: 'Eb Major 7' }
    ],
    'techno': [
      { id: 'Am', name: 'A Minor' },
      { id: 'Cm', name: 'C Minor' },
      { id: 'Fm', name: 'F Minor' },
      { id: 'Gm', name: 'G Minor' },
      { id: 'Bbm', name: 'Bb Minor' }
    ],
    'trance': [
      { id: 'Fm', name: 'F Minor' },
      { id: 'Ab', name: 'Ab Major' },
      { id: 'Bb', name: 'Bb Major' },
      { id: 'Cm', name: 'C Minor' },
      { id: 'Ebmaj7', name: 'Eb Major 7' }
    ],
    'drum-and-bass': [
      { id: 'Fm', name: 'F Minor' },
      { id: 'Cm', name: 'C Minor' },
      { id: 'Gm', name: 'G Minor' },
      { id: 'Ebmaj7', name: 'Eb Major 7' },
      { id: 'Bbm', name: 'Bb Minor' }
    ],
    'ambient': [
      { id: 'Cmaj7', name: 'C Major 7' },
      { id: 'Em7', name: 'E Minor 7' },
      { id: 'Fmaj7', name: 'F Major 7' },
      { id: 'Am7', name: 'A Minor 7' },
      { id: 'Dmaj7', name: 'D Major 7' }
    ],
    'dubstep': [
      { id: 'Fm', name: 'F Minor' },
      { id: 'Cm', name: 'C Minor' },
      { id: 'Gm', name: 'G Minor' },
      { id: 'Bbm', name: 'Bb Minor' },
      { id: 'Ebm', name: 'Eb Minor' }
    ],
  
    // Classical
    'standard-classical': [
      { id: 'C', name: 'C Major' },
      { id: 'G', name: 'G Major' },
      { id: 'F', name: 'F Major' },
      { id: 'Am', name: 'A Minor' },
      { id: 'Dm', name: 'D Minor' }
    ],
    'baroque': [
      { id: 'D', name: 'D Major' },
      { id: 'G', name: 'G Major' },
      { id: 'F', name: 'F Major' },
      { id: 'Bm', name: 'B Minor' },
      { id: 'Em', name: 'E Minor' }
    ],
    'romantic': [
      { id: 'Eb', name: 'Eb Major' },
      { id: 'Ab', name: 'Ab Major' },
      { id: 'Bb', name: 'Bb Major' },
      { id: 'Cm', name: 'C Minor' },
      { id: 'Gm', name: 'G Minor' }
    ],
    'impressionism': [
      { id: 'Dbmaj7', name: 'Db Major 7' },
      { id: 'Ebmaj7', name: 'Eb Major 7' },
      { id: 'Fmaj7', name: 'F Major 7' },
      { id: 'Abmaj7', name: 'Ab Major 7' },
      { id: 'Bbmaj7', name: 'Bb Major 7' }
    ],
  
    // Folk
    'standard-folk': [
      { id: 'G', name: 'G Major' },
      { id: 'D', name: 'D Major' },
      { id: 'C', name: 'C Major' },
      { id: 'Em', name: 'E Minor' },
      { id: 'Am', name: 'A Minor' }
    ],
    'irish-folk': [
      { id: 'D', name: 'D Major' },
      { id: 'G', name: 'G Major' },
      { id: 'A', name: 'A Major' },
      { id: 'Em', name: 'E Minor' },
      { id: 'Bm', name: 'B Minor' }
    ],
    'bluegrass': [
      { id: 'G', name: 'G Major' },
      { id: 'A', name: 'A Major' },
      { id: 'D', name: 'D Major' },
      { id: 'C', name: 'C Major' },
      { id: 'Em', name: 'E Minor' }
    ],
    'nordic-folk': [
      { id: 'Dm', name: 'D Minor' },
      { id: 'Am', name: 'A Minor' },
      { id: 'Em', name: 'E Minor' },
      { id: 'F', name: 'F Major' },
      { id: 'Gm', name: 'G Minor' }
    ]
  };
  
  // Funkcja do pobierania tonacji dla podgatunku
  export const getKeysForSubGenre = (subGenreId) => {
    return subGenreKeys[subGenreId] || [];
  };
  
  // Funkcja do sprawdzania, czy podgatunek obsługuje daną tonację
  export const isKeyValidForSubGenre = (subGenreId, keyId) => {
    const keys = getKeysForSubGenre(subGenreId);
    return keys.some(key => key.id === keyId);
  };
  
  export default subGenreKeys;