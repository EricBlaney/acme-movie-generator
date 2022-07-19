import React from 'react';
import { connect } from 'react-redux';
import  { createMovie, updateMovie, deleteMovie } from './store';
import { faker } from '@faker-js/faker';

const Movies = ({ movies, increment, createMovie, deleteMovie}) => {
    console.log(movies);
    return (
        <div>
            The average rating of all films is: {(movies.reduce((a,b) => a + b.rating,0 )/movies.length).toFixed(1)}
            <br></br>
            <button onClick = {createMovie}>Create A New Movie</button>
            <ul>
                {
                    movies.map( movie => {
                        return (
                            <li key = {movie.id}>
                                <button onClick={() => deleteMovie(movie)}>X</button>
                                {movie.name} - rating: {movie.rating}
                                <button onClick={() => increment(movie, -1)}> - </button>
                                <button onClick={() => increment(movie, +1)}> + </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mStP = (state) => {
    return {
        movies: state.movies
    }
}

const mDtP = (dispatch) => {
    return {
        createMovie: () => {
             dispatch(createMovie({name: faker.company.catchPhrase()}));
        },
        deleteMovie: (movie) => {
            dispatch(deleteMovie(movie));
        },
        increment: (movie, dir) => {
            movie = {...movie, rating: movie.rating + dir};
            dispatch(updateMovie(movie));
        }
    }
}
export default connect(mStP,mDtP)(Movies);