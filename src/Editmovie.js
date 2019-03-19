import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Edit extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Edit page</title>
                </Helmet>
                <p>Edit the movie!!</p>
            </>
        );
    }
}
export default Edit;