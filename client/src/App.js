import React, { Component } from 'react';
import parser from 'fast-xml-parser';

let fileReader;
const apiUrl = 'http://localhost:5000/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {status: ''};
  }

  handleFileRead = event => {
    const content = fileReader.result;
    const parseErr = parser.validate(content).err;

    console.log(parseErr);

    if (parseErr === undefined) {
      this.postContentToAPI(content).then(() => {
        this.setState({status: 'Success'});
      }).catch(error => {
        this.setState({status: 'Error: ' + error.message});
      });
    } else {
      this.setState({status: parseErr.code + ': ' + parseErr.msg})
    };
  }

  handleFileChoosen = file => {
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(file);
  }

  postContentToAPI = (content) => {   
    return new Promise((resolve, reject) => {
      fetch(
        apiUrl + '/xmlContent', { method: 'POST',
          headers: new Headers({
            'Content-Type': 'text/xml; charset=utf-8',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'Keep-alive',
            'Content-Length': content.length                
          }),
          body: content
      }).then(response => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(new Error(response.statusText));
        }
      }, error => {
        reject(new Error(error.message));
      });
    });
  };

  render() {
    return (
      <div className='App'>
        <input type='file'
                id='file'
                className='input-file'
                accept='.xml'
                onChange={e => this.handleFileChoosen(e.target.files[0])}
        />
        <br />
        <span>{this.state.status}</span>
      </div>
    );
  }
}

export default App;
