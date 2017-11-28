import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';


/* smart 컴포넌트 : 상태를 가지고 있다. */
// class Movie extends Component {

//     static propTypes = {
//         title: PropTypes.string.isRequired,
//         poster: PropTypes.string.isRequired
//     }

//     componentWillMount() {
//         // console.log(`=====Movie component will mount=====`);
//     }

//     componentDidMount() {
//         // console.log(`=====Movie component did mount=====`);
//     }

//     render() {
//         // console.log(`=====Movie component render=====`);
//         return (
//             <div className="movie-one">
//                 <h1>{this.props.title}</h1>
//                 <MoviePoster poster={this.props.poster} />
//             </div>
//         );
//     }
// }


/* state component */
// class MoviePoster extends Component {
//     render() {
//         return(
//             <img className="movie-pic" src={this.props.poster} alt={this.props.title}/>
//         );
//     }
// }

/* stateless component */
// state가 없는 functional 컴포넌트, dump 컴포넌트
// render 메소드도 없고, 컴포넌트 생명주기도 없다. 단지 인자를 반환할 뿐이다. 
const Movie = ({title, poster, genres, synopsis}) => (
    <div className="movie">
        <div className="movie_columns">
            <MoviePoster poster={poster} alt={title}/>
        </div>
        <div className="movie_columns">
            <h1>{title}</h1>
            <div className="movie_genres">
                {genres.map( (genre, idx) => <MovieGenre genre={genre} key={idx} />)}
            </div>
            <div className="movie_synopsis">
                {synopsis}
            </div>
        </div>

    </div>)
;
const MoviePoster = ({poster, alt}) => (<img className="movie_poster" src={poster} title={alt} alt={alt}/>);
const MovieGenre = ({genre}) => (<span className="movie_genre">{genre}</span>);

MovieGenre.propTypes = {
    genre: PropTypes.string.isRequired,
}

Movie.propTypes = { 
    title: PropTypes.string.isRequired, 
    genres: PropTypes.array.isRequired, 
    synopsis: PropTypes.string.isRequired, 
    poster: PropTypes.string.isRequired 
};

MoviePoster.propTypes = {
    poster: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

export default Movie;