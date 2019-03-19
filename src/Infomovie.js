import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
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
            <div className=''>
                <Helmet>
                    <title>Info page</title>
                </Helmet>
                {console.log(this.state.movie)}
                <h2>More about {this.state.movie.title}</h2>
                <div className='info-page'>
                    <h2></h2>
                    <p></p>
                </div>
            </div>
        );
    }
}

export default Info;