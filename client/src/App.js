import React, { Component } from 'react';
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <FilePond allowMultiple={true} server="http://localhost:5000/api/uploadFile" />

      </div>
    );
  }
}

export default App;
