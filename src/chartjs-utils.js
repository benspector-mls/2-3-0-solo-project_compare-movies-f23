Chart.defaults.color = '#e4e4e4';

const makeChart = (ctx, type, labels, datasets, options) => {
  // Always remove and re-insert a context when drawing a chart
  const newCanvas = document.createElement('canvas');
  newCanvas.id = ctx.id;
  ctx.parentNode.append(newCanvas);
  ctx.remove();

  new Chart(newCanvas, {
    type,
    data: {
      labels,
      datasets
    },
    options
  });
}

const formatBoxOfficeTicks = (value) => {
  return value === 0
    ? '$0MM'
    : `$${String(value).split('').slice(0, -6).join('')}MM`
}

export const makeDomesticGrossBarChart = (movies) => {
  const ctx = document.querySelector('#domestic-bar-chart');
  const type = 'bar';
  movies = movies.slice().sort((movieA, movieB) => movieB.domestic - movieA.domestic);
  const labels = movies.map((movie) => movie.title);
  const datasets = [
    { label: 'Domestic Gross', data: movies.map((movie) => movie.domestic), borderWidth: 1 }
  ]

  const options = {
    scales: {
      y: {
        ticks: {
          callback: formatBoxOfficeTicks
        },
        title: {
          display: true,
          text: 'Domestic Box Office',
        },
      }
    }
  }

  makeChart(ctx, type, labels, datasets, options);
}

export const makeGenreDonutChart = (movies) => {
  const ctx = document.querySelector('#genre-doughnut-chart');
  const type = 'doughnut'

  // get all unique genres
  const labels = movies
    .map((movie) => movie.genre)
    .filter((movie, id, arr) => arr.indexOf(movie) === id);

  // create a frequency counter for the genres
  const genreFreqs = movies.reduce((genreFreqs, movie) => {
    genreFreqs[movie.genre] = (genreFreqs[movie.genre] || 0) + 1
    return genreFreqs;
  }, {});

  const datasets = [
    { label: 'Genre', data: Object.values(genreFreqs) }
  ]

  makeChart(ctx, type, labels, datasets);
}

export const makeAudienceCriticScorePlot = (movies) => {
  const ctx = document.querySelector('#audience-critic-score-chart');
  const type = 'scatter'

  const datasets = [
    {
      label: 'Audience Score',
      data: movies.map((movie) => ({ title: movie.title, x: movie.audienceScore, y: movie.domestic }))
    },
    {
      label: 'Critic Score',
      data: movies.map((movie) => ({ title: movie.title, x: movie.criticScore, y: movie.domestic }))
    }
  ]

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Domestic Box Office',
        },
        ticks: {
          callback: formatBoxOfficeTicks
        }
      },
      x: {
        title: {
          display: true,
          text: 'Rotton Tomatoes Score',
        },
        type: 'linear',
        position: 'bottom'
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            console.log(context);
            const { raw: { title, x }, dataset: { label } } = context;
            return `${title} ${label}: ${x}`
          }
        }
      }
    }
  }
  makeChart(ctx, type, '', datasets, options);
}