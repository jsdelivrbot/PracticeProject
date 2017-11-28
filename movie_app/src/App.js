import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

const movieTitles = [
  "Matrix",
  "Full Metal Jacket",
  "Oldboy",
  "Star Wars",
  "Transformers"
];

const movieImages = [
  "https://static.rogerebert.com/uploads/movie/movie_poster/the-matrix-1999/large_gynBNzwyaHKtXqlEKKLioNkjKgN.jpg",
  "https://images-na.ssl-images-amazon.com/images/I/71qDKzqJZrL._SL1101_.jpg",
  "https://upload.wikimedia.org/wikipedia/en/6/67/Oldboykoreanposter.jpg",
  "https://vignette.wikia.nocookie.net/starwars/images/f/fe/TheLastJediTheatricalPoster.jpeg/revision/latest?cb=20171010002420",
  "https://i.ytimg.com/vi/2_x-4yDeMA4/movieposter.jpg"
];


// this.state안으로 해당 데이터를 옮겼다.
// const  movies = movieTitles.map( (title, i) => Object({
//   title, poster : movieImages[i]
// }));


/**
 * Render : ComponentWillMount() -> render() -> componentDidMount()
 * update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
 */


class App extends Component {
  /* state가 바뀔 때마다 다시 렌더링 된다. */
  state = {
      greeting : "Hello!",
      // movies : movieTitles.map( (title, i) => Object({
      //   title, poster : movieImages[i]
      // }))
  }

  componentWillMount() {
    // console.log(`=====App component will mount=====`);
  }

  componentDidMount() {
    // console.log(`=====App component did mount=====`);
    setTimeout(() => {
      // 아래처럼 직접적으로 접근해서는 안된다.
      // 이렇게 하면 render 설정들이 작동 안한다.
      // this.state.greeting = "something";

      // 대신 setState로 쓴다.
      this.setState({
        greeting: "LOOOOOOOOOOOOOOOOOL",
        // movies : movieTitles.map( (title, i) => Object({
        //   title, poster : movieImages[i]
        // }))
      });
    }, 5000);

    this._getMovies();

  }

  async _getMovies() {
    const movies = await this._callApi(); 
    console.log(111111111111,movies);
    this.setState({movies});
  }

  _callApi() {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(res => res.json())
    // .then(json => console.log(json))
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  _renderMovies = () => {
    const movies = this.state.movies.map( (movie, idx) => {
      return <Movie 
        key={movie.id} 
        title={movie.title} 
        genres={movie.genres}
        synopsis={movie.synopsis}
        poster={movie.medium_cover_image} />
    });
    return movies;
  }

  render() {
    const {movies} = this.state;
    // console.log(`=====App component render=====`);
    return (
      <div className={movies ? "App" : "App_loading"}>
        {movies ? this._renderMovies() : "Loading"}
        {/* {this.state.greeting}<br/> */}
        {/* {this.state.movies.map( (movie, idx) => {
          console.log(idx, movie.title);
          return <Movie key={idx} title={movie.title} poster={movie.poster} />
        })} */}
      </div>
    );
  }
}

export default App;
