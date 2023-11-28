import movieData from './movie-data.json'

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorageKey = (key) => {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const getMovies = () => getLocalStorageKey('movies') || [];
export const setMovies = (movies) => setLocalStorageKey('movies', movies);
export const addMovie = (movie) => {
  const movies = getMovies();
  movies.push(movie);
  setMovies(movies);
};

// { "criticScore": 88, "audienceScore": 83, "domestic": 635763484, "genre": "comedy",    "title": "Barbie" },
export const resetMovies = () => setLocalStorageKey('movies', movieData);
export const initMoviesIfEmpty = () => {
  if (getMovies().length === 0) resetMovies();
}