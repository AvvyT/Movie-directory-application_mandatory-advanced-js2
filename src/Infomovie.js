import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from "axios";

class Info extends Component {
    constructor(props) {
        super(props);

        this.state = { movie: [] };
    }

    componentWillMount() {
        axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.props.match.params.id}`)
            .then(response => this.setState({ movie: response.data }));
        //console.log(response.data);
    }

    render() {
        console.log(this.props.match.params.id);

        return (
            <>
                <h2>More about {this.state.movie.title}</h2>
                <div className='home-page'>
                    <Helmet>
                        <title>Info page</title>
                    </Helmet>
                    {console.log(this.state.movie)}
                    <h2 className='info-text'>Intresting: {this.state.movie.description}</h2>
                    <br></br>
                    <p className='info-text'>Director: {this.state.movie.director}</p>
                    <p className='info-text'>Rating: {this.state.movie.rating}</p>
                    <br></br>
                    <h2><Link className='info-edit' to={'/edit/' + this.state.movie.id}>Edit {this.state.movie.title}</Link></h2>
                </div>
            </>
        );
    }
}

export default Info;