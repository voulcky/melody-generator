// Definicja gatunków i podgatunków muzycznych
const genres = [
    {
      id: 'rock',
      name: 'Rock',
      subGenres: [
        { id: 'standard-rock', name: 'Standard Rock' },
        { id: 'hard-rock', name: 'Hard Rock' },
        { id: 'progressive-rock', name: 'Progressive Rock' },
        { id: 'indie-rock', name: 'Indie Rock' }
      ]
    },
    {
      id: 'pop',
      name: 'Pop',
      subGenres: [
        { id: 'standard-pop', name: 'Standard Pop' },
        { id: 'dance-pop', name: 'Dance Pop' },
        { id: 'rnb-pop', name: 'R&B Pop' },
        { id: 'country-pop', name: 'Country Pop' }
      ]
    },
    {
      id: 'jazz',
      name: 'Jazz',
      subGenres: [
        { id: 'standard-jazz', name: 'Standard Jazz' },
        { id: 'bebop', name: 'Bebop' },
        { id: 'fusion', name: 'Fusion' },
        { id: 'swing', name: 'Swing' }
      ]
    },
    {
      id: 'blues',
      name: 'Blues',
      subGenres: [
        { id: 'standard-blues', name: 'Standard Blues' },
        { id: 'delta-blues', name: 'Delta Blues' },
        { id: 'chicago-blues', name: 'Chicago Blues' },
        { id: 'jazz-blues', name: 'Jazz Blues' }
      ]
    },
    {
      id: 'electronic',
      name: 'Electronic',
      subGenres: [
        { id: 'house', name: 'House' },
        { id: 'techno', name: 'Techno' },
        { id: 'trance', name: 'Trance' },
        { id: 'drum-and-bass', name: 'Drum and Bass' },
        { id: 'ambient', name: 'Ambient' },
        { id: 'dubstep', name: 'Dubstep' }
      ]
    },
    {
      id: 'classical',
      name: 'Classical',
      subGenres: [
        { id: 'standard-classical', name: 'Standard Classical' },
        { id: 'baroque', name: 'Baroque' },
        { id: 'romantic', name: 'Romantic' },
        { id: 'impressionism', name: 'Impressionism' }
      ]
    },
    {
      id: 'folk',
      name: 'Folk',
      subGenres: [
        { id: 'standard-folk', name: 'Standard Folk' },
        { id: 'irish-folk', name: 'Irish Folk' },
        { id: 'bluegrass', name: 'Bluegrass' },
        { id: 'nordic-folk', name: 'Nordic Folk' }
      ]
    }
  ];
  
  // Funkcja pomocnicza do pobierania podgatunków na podstawie gatunku
  export const getSubGenres = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.subGenres : [];
  };
  
  // Funkcja pomocnicza do znajdowania gatunku na podstawie ID podgatunku
  export const findGenreBySubGenreId = (subGenreId) => {
    for (const genre of genres) {
      const subGenre = genre.subGenres.find(sg => sg.id === subGenreId);
      if (subGenre) {
        return {
          genre: genre,
          subGenre: subGenre
        };
      }
    }
    return null;
  };
  
  export default genres;