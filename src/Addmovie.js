import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './Addmovie.css';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            title: '', director: '', description: '', rating: 1,
            complete: false
        };

        this.dismissError = this.dismissError.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDirectorChange = this.handleDirectorChange.bind(this);
        this.handleDecripChange = this.handleDecripChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleDirectorChange(e) {
        this.setState({ director: e.target.value });
    }

    handleDecripChange(e) {
        this.setState({ description: e.target.value });
    }

    handleRatingChange(e) {
        this.setState({ rating: e.target.value });
    }

    handleSubmit(e) {
        //alert('A title was submitted: ' + this.state.title);
        e.preventDefault();

        if (!this.state.title || !this.state.director ||
            !this.state.description || !this.state.rating) {
            return this.setState({ error: '!! Complete the form is required!' });
        }

        let add = {};

        add.title = this.state.title
        add.description = this.state.description
        add.director = this.state.director
        add.rating = this.state.rating
        console.log(add); // lägg det nya innehåll

        axios.post("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/", add)
            .then((response) => {
                console.log(response); // se nya datan!
                this.setState({ complete: true })
            })
    }

    render() {
        if (this.state.complete) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <>
                <Helmet>
                    <title>Add page</title>
                </Helmet>
                <h2>Add a movie</h2>

                <div className='home-page'>
                    <form onSubmit={this.handleSubmit}>
                        <label className='info-text'>Title: <input
                            placeholder=" Write a movie title.."
                            minLength={1}
                            maxLength={40}
                            className="add-input"
                            name="title"
                            type="text"
                            onChange={this.handleTitleChange} required />
                        </label><br /><br />
                        <label className='info-text'>Description: <textarea
                            placeholder=" Write a description.."
                            minLength={1}
                            maxLength={300}
                            name="description"
                            className='text-area'
                            onChange={this.handleDecripChange} />
                        </label><br /><br /><br />
                        <label className='info-text'>Director: <input
                            placeholder=" Write director's name.."
                            minLength={1}
                            maxLength={40}
                            className="add-input"
                            name="director"
                            type="text"
                            onChange={this.handleDirectorChange} required />
                        </label><br /><br />
                        <label className='info-text'>Rating: <input
                            className="rating"
                            type="range"
                            value={this.state.rating}
                            min={0} max={5}
                            step="0.1"
                            onChange={this.handleRatingChange} required />
                            {this.state.rating}/5
                        </label><br /><br />
                        <input className="control"
                            type="submit"
                            value="Save"
                            onClick={this.onClick} />
                        {
                            this.state.error && <h3 className='error-text' onClick={this.dismissError}>
                                {this.state.error}
                                <button className="myError" onClick={this.dismissError}>✖</button></h3>
                        }
                    </form>
                </div>
            </>
        );
    }
}

export default Add;