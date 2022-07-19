import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from './store';
import Movies from './Movies';
import { loadMovies } from './store';

const root = createRoot(document.querySelector('#root'));

class _App extends Component{
    componentDidMount(){
        try{
            this.props.loadMovies();
        }
        catch(ex){
            console.log(ex);
        }
    }
    render(){
        return (
            <div>
                Acme Movie Generator:
                <Movies />
            </div>
        )
    }
}

const mDtP = (dispatch) => {
    return {
            loadMovies: () => {
                dispatch(loadMovies());
            }
        }
    }
const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const App = connect(mapStateToProps, mDtP)(_App);

root.render(<Provider store = { store }><App />  </Provider>);
