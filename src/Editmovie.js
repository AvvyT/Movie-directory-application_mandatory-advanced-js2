import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import axios from "axios";


class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasChanges: false, updated: false, title: '', description: '', director: '',
            rating: 0, error: ''
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDirectorChange = this.handleDirectorChange.bind(this);
        this.handleDecripChange = this.handleDecripChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value, hasChanges: true });
    }

    handleDirectorChange(e) {
        this.setState({ director: e.target.value, hasChanges: true });
    }

    handleDecripChange(e) {
        this.setState({ description: e.target.value, hasChanges: true });
    }

    handleRatingChange(e) {
        this.setState({ rating: e.target.value, hasChanges: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.hasChanges) {
            return this.setState({ error: ' No changes to submit!' });
        }

        let edit = {};

        edit.title = this.state.title
        edit.description = this.state.description
        edit.director = this.state.director
        edit.rating = this.state.rating
        console.log(edit); // se det nya innehåll

        // ----skicka det nya ändrat innehåll
        axios.put(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.props.match.params.id}`,
            edit, { headers: { "Content-Type": "application/json" } }) // -----
            .then((respons) => {
                console.log(respons); // visa nya data
                this.setState({ updated: true })
            })
            .catch(() => {
                this.setState({ error: "An error has occurred" });
            })
    }

    // ----hämta o ändra innehåll request
    componentDidMount() {
        this.source = axios.CancelToken.source();

        axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.props.match.params.id}`, { cancelToken: this.source.token })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    director: response.data.director,
                    rating: response.data.rating
                })
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                }
            });
    }

    componentWillUnmount() {
        this.source.cancel("Operation canceled by the user.");
    }

    render() {
        if (this.state.updated) {
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
                            type="text"
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
export default Edit;