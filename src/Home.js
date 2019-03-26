import React, { Component } from 'react';

import './Home.css';
import Axios from 'axios';
import RenderTable from './RenderTable';

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = { movies: [] }
        this.deleteMovie = this.deleteMovie.bind(this);

        Axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies')
            .then((response) => {
                this.setState({ movies: response.data });
                console.log(this.state.movies);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteMovie(id) {
        Axios.delete("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id)
            .then((respons) => {
                //console.log(respons); // får ett tomt respons
                this.setState({ movies: this.state.movies.filter(movie => id !== movie.id) })
                console.log(this.state.movies); // får det nuvarande movies
            })
    }

    render() {
        return (
            <div className='home-page'>
                <header className='container-header'>
                    <h2>All-Movies page</h2>
                    <input
                        className='filter-input'
                        placeholder='filtrera'
                    />
                </header>
                <RenderTable delete={this.deleteMovie} movies={this.state.movies}></RenderTable>
            </div >
        );
    }
}

export default Homepage;
