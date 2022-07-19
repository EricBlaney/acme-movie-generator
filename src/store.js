import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import thunk from 'redux-thunk';

const initialState = {
        movies: []
  };

const moviesReducer = (state = [], action) => {
    if(action.type === 'CREATE_MOVIE') {
        return [...state, action.movie];
    }
    if(action.type === 'DELETE_MOVIE') {
        return state.filter( movie => movie.id !== action.movie.id)
    }
    if(action.type === 'UPDATE_MOVIE') {
        return state.map( movie => movie.id !== action.movie.id ? movie : action.movie )
    }
    if(action.type === 'SET_MOVIES'){
        return action.movies;
    }
    return state
}

const reducer = combineReducers({
    movies: moviesReducer
})
const store = createStore(reducer, applyMiddleware(thunk, logger));

const createMovie = (movie) => {
    return async(dispatch) => {
        await (await axios.post('/api/movies', {name: movie.name})).data;
        const response = (await axios.get('/api/movies')).data;
        dispatch({ type: 'CREATE_MOVIE', movie});
        dispatch({ type: 'SET_MOVIES', movies: response});
    }
}

const updateMovie = (movie) => {
    return async(dispatch) => {
        movie = (await axios.put(`/api/movies/${movie.id}`, movie)).data;
        const response = (await axios.get('/api/movies')).data;
        dispatch({ type: 'UPDATE_MOVIE', movie});
        dispatch({ type: 'SET_MOVIES', movies: response});
    }
}

const deleteMovie = (movie) => {
    return async(dispatch) => {
        await axios.delete(`/api/movies/${movie.id}`);
        dispatch({ type: 'DELETE_MOVIE', movie });
    }
}

const loadMovies = () => {
    return async(dispatch) => {
        const response = (await axios.get('/api/movies')).data;
        dispatch({ type: 'SET_MOVIES', movies: response});
    }
}


export { loadMovies, deleteMovie, createMovie, updateMovie };
export default store;