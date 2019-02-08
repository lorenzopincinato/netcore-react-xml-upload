import React, { Component } from 'react';
import parser from 'fast-xml-parser';
import postContentToAPI from './services'

let fileReader;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {status: ''};
  }

  handleFileRead = () => {
    const content = fileReader.result;
    const parseErr = parser.validate(content).err;

    if (parseErr === undefined) {
      postContentToAPI(content).then(() => {
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

  render() {
    return (
      <div className='App'>
        <input type='file'
                id='file'
                className='input-file'
                accept='.xml'
                draggable={true}
                onChange={e => this.handleFileChoosen(e.target.files[0])}/>
        <br />
        <span>{this.state.status}</span>
      </div>
    );
  }
}

export default App;
