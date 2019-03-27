import React, { Component } from 'react';
import RenderTable from './RenderTable';
import './Home.css';
import axios from 'axios';

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = { movies: [], filter: '' }

        this.deleteMovie = this.deleteMovie.bind(this);
        this.changeInput = this.changeInput.bind(this);

        axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies')
            .then((response) => {
                this.setState({ movies: response.data });
                console.log(this.state.movies);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    changeInput(e) {
        this.setState({ filter: e.target.value });
    }

    deleteMovie(id) {
        axios.delete("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id)
            .then(() => {
                //console.log(respons); // får ett tomt respons
                this.setState({ movies: this.state.movies.filter(movie => id !== movie.id) })
                console.log(this.state.movies); // får det nuvarande movies
            })
    }

    render() {
        const { movies, filter } = this.state;

        let filtrerad = movies.filter(movie =>
            movie.title.toLowerCase().includes(filter.toLowerCase()) ||
            movie.director.toLowerCase().includes(filter.toLowerCase()));

        return (
            <div className='home-page'>
                <header className='container-header'>
                    <h2>All-Movies page</h2>
                    <input
                        className='filter-input'
                        placeholder='filtrera'
                        onChange={this.changeInput}
                    />
                </header>
                <RenderTable delete={this.deleteMovie} movies={filtrerad}></RenderTable>
            </div >
        );
    }
}

export default Homepage;
