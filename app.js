const SEARCH_BTN = document.querySelector('#search');

const getMovies = async (query) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`,
  );
  const { results } = await res.json();
  return results;
};

const getRatingClass = (r) => {
  if (r < 5) {
    return 'movie__rating--red';
  }
  if (r < 8) {
    return 'movie__rating--yellow';
  }
  return 'movie__rating--green';
};

const renderMovies = (movies) => {
  const moviesWrapper = document.querySelector('.movies');

  moviesWrapper.innerHTML = movies.map((movie) => `<div class="movie">
    <img src="https://image.tmdb.org/t/p/w1280${movie.poster_path}"
         alt="${movie.title}">
    <div class="movie__info">
    <div class="movie__header">
    <h3>${movie.title}</h3>
      <span class="movie__rating ${getRatingClass(
    movie.vote_average,
  )}">${movie.vote_average}</span>
    </div>
      
      <div class="movie__detail">
        <h3>Overview</h3>
        ${movie.overview}
      </div>
    </div>
   
  </div>`).join('');
};

SEARCH_BTN.addEventListener('keypress', async (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    const { target } = evt;
    const { value } = target;
    const movies = await getMovies(value);
    renderMovies(movies);
  }
});

const getDiscoverMovies = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c',
  );
  const { results } = await res.json();
  return results;
};

const main = async () => {
  const movies = await getDiscoverMovies();
  renderMovies(movies);
};

main();
