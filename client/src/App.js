import React, { Component } from 'react';
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <FilePond allowMultiple={true} server="http://localhost:5000/api/uploadFiles" />

      </div>
    );
  }
}

export default App;
