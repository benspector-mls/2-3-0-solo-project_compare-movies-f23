import { getMovies, addMovie, resetMovies, initMoviesIfEmpty } from './local-storage-utils.js';
import { makeDomesticGrossBarChart, makeAudienceCriticScorePlot, makeGenreDonutChart } from './chartjs-utils.js';
import './style.css';

const renderMovie = (movieList, movie) => {
  const { title, genre, domestic, audienceScore, criticScore } = movie;

  const h3 = document.createElement('h3');
  const criticScoreP = document.createElement('p');
  const audienceScoreP = document.createElement('p');
  const genreP = document.createElement('p');
  const domesticP = document.createElement('p');

  h3.innerText = title;
  criticScoreP.innerText = `Critic Score: ${criticScore}%`;
  audienceScoreP.innerText = `Critic Score: ${audienceScore}%`;
  genreP.innerText = `Genre: ${genre}`;
  domesticP.innerText = `Box Office: $${domestic.toLocaleString("en-US")}`;

  const movieCard = document.createElement('li');
  movieCard.classList.add('movie-card');
  movieCard.append(h3, criticScoreP, audienceScoreP, domesticP, genreP);

  movieList.append(movieCard);
}

const renderData = () => {
  const movieList = document.querySelector('#movies-list');
  movieList.innerHTML = '';

  const movies = getMovies();
  movies.forEach((movie) => renderMovie(movieList, movie));

  makeDomesticGrossBarChart(movies);
  makeGenreDonutChart(movies);
  makeAudienceCriticScorePlot(movies);
}

const handleFormSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);

  // Do not add movies that have blank values
  if (Object.values(formObj).some((value) => !value)) return;

  addMovie({
    criticScore: Number(formObj['critic-score']),
    audienceScore: Number(formObj['audience-score']),
    domestic: Number(formObj['domestic-box-office']),
    genre: formObj.genre,
    title: formObj['movie-title']
  });
  renderData();
  form.reset();
}

const handleResetMovies = () => {
  resetMovies();
  renderData();
}

const main = () => {
  initMoviesIfEmpty();
  renderData();
  document.querySelector("#add-movie-form").addEventListener('submit', handleFormSubmit);
  document.querySelector("#reset").addEventListener('click', handleResetMovies);
}

main();
