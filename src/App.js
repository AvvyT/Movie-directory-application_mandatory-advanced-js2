import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

import './App.css';
import Homepage from './Home';
import Addmovie from './Addmovie';
import Infomovie from './Infomovie';
import Editmovie from './Editmovie';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1> My movie directory application </h1>
            <Helmet>
              <title>Home page</title>
            </Helmet>
            <div className='header-pages'>
              <Link to="/"><button className='page'>Home</button></Link>
              <Link to="/add/"><button className='page'>Addmovie</button></Link>
            </div>
          </header>
          <Route path="/" exact component={Homepage} />
          <Route path="/add/" component={Addmovie} />
          <Route path="/info/:id" component={Infomovie} />
          <Route path="/edit/:id" component={Editmovie} />
        </div>
      </Router>
    );
  }
}

export default App;
