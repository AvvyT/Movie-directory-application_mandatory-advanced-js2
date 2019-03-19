import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Add extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Add page</title>
                </Helmet>
                <h1>Add ane film!</h1>
            </>
        );
    }
}

export default Add;