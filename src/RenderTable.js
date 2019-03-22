import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RenderTable.css';
//import ScrollToBottom from "react-scroll-to-bottom";


class RenderThead extends Component {
    render() {
        const movies = this.props.movies;

        return (
            <table className='myTable' border='2'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Rating</th>
                        <th>Control</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((x) => {
                        return (
                            <TableRow key={x.id}
                                title={x.title}
                                movieId={x.id}
                                director={x.director}
                                rating={x.rating}
                                delete={this.props.delete}
                            />
                        );
                    })}
                </tbody>
            </table >
        );
    }
}

class TableRow extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        let id = e.target.value;
         //console.log(id);
        this.props.delete(id);
    }

    render() {
        return (
            <tr key={this.props.id}>
                <td className='style-td'>
                    <Link to={'/info/' + this.props.movieId} className= 'style-title'>
                        {this.props.title}
                    </Link>
                </td>
                <td className='style-td color'>{this.props.director}</td>
                <td>{this.props.rating}</td>
                <td value={this.props.movieId}>
                    <Link className='control edit-link' to={'/edit/' + this.props.movieId}>Edit</Link>
                    <button className='control'
                        onClick={this.handleDelete}
                        value={this.props.movieId}
                    >delete
                    </button>
                </td>
            </tr>
        );
    }
}

class RenderTable extends Component {
    render() {
        return (
            <>
                <RenderThead delete={this.props.delete} movies={this.props.movies} />
            </>
        );
    }
}

export default RenderTable;
