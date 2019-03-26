import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import axios from "axios";


class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editmovie: {}, edit: '', complete: false, create: false, title: '', description: '',
            director: '',
            rating: 0
        };
        
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDirectorChange = this.handleDirectorChange.bind(this);
        this.handleDecripChange = this.handleDecripChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        let edit = {};

        edit.title = this.state.title
        edit.description = this.state.description
        edit.director = this.state.director
        edit.rating = this.state.rating
        console.log(edit); // lägg det nya innehåll

        axios.put(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.props.match.params.id}`,
            edit, { headers: { "Content-Type": "application/json" } }) // -----
            .then((respons) => {
                console.log(respons); // visa nya data
                this.setState({ create: true })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidMount() {
        axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.props.match.params.id}`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    editmovie: response, complete: true,
                    title: response.data.title,
                    description: response.data.description,
                    director: response.data.director,
                    rating: response.data.rating
                })
            })
    }

    render() {
        if (this.state.create) {
            return <Redirect to="/"></Redirect>
        }
        //console.log(this.props.match.params.id);
        //console.log(this.state.editmovie)
        return (
            <>
                <h2>Edit {this.state.title}</h2>
                <div className='home-page'>
                    <Helmet>
                        <title>Edit page</title>
                    </Helmet>
                    <form onSubmit={this.handleSubmit}>
                        <label className='info-text'>Title: <input
                            placeholder=" Write a movie title.."
                            minLength={1}
                            maxLength={40}
                            className="add-input"
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.handleTitleChange} required />
                        </label><br /><br />
                        <label className='info-text'>Description: <textarea
                            placeholder=" Write a description.."
                            minLength={1}
                            maxLength={300}
                            name="description"
                            className='text-area'
                            value={this.state.description}
                            onChange={this.handleDecripChange} />
                        </label><br /><br /><br />
                        <label className='info-text'>Director: <input
                            placeholder=" Write director's name.."
                            minLength={1}
                            maxLength={40}
                            className="add-input"
                            name="director"
                            type="text"
                            value={this.state.director}
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
                            onChange={this.handleSubmit} />
                    </form>
                </div>
            </>
        );
    }
}
export default Edit;