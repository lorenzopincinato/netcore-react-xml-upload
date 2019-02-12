import React, { Component } from 'react';
import parser from 'fast-xml-parser';
import postFilesToAPI from './services'

const initialState = {
  validFiles: [],
  invalidFiles: []
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { status: '', ...initialState } ;
  }

  postValidFiles = () => {
    if (this.state.invalidFiles.length === 0) {
      postFilesToAPI(this.state.validFiles).then(() => {
        this.setState({ status: 'Success!' });
      }).catch((error) => {
        this.setState({status: error.message});
      });
    } else {
      const invalidFiles = this.state.invalidFiles.map((file) => `${file.name}`).join(', ');

      this.setState({ status: `Invalid file(s): ${invalidFiles}.` });
    }
  }

  handleFile = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        const content = fileReader.result;
        const parseErr = parser.validate(content).err;
    
        const newFile = {
          name: file.name,
          content: content
        }

        if (parseErr === undefined)
          resolve(newFile);
        
        reject(newFile);
      }
      fileReader.readAsText(file);
    });
  }

  handleFiles = files => {
    return Promise.all(Array.from(files).map(file => this.handleFile(file).then(validFile => {
      this.setState({ validFiles: [...this.state.validFiles, validFile]});
    }).catch(invalidFile => {
      this.setState({ invalidFiles: [...this.state.invalidFiles, invalidFile]});
    })));
  }

  handleFilesChanged = files => {
    this.setState({...initialState});

    this.handleFiles(files).then(() => {
      this.postValidFiles();
    });
  }

  render() {
    return (
      <div className='App'>
        <input type='file'
                id='file'
                className='input-file'
                accept='.xml'
                draggable={true}
                onChange={e => this.handleFilesChanged(e.target.files)}
                multiple />
        <br />
        <span>{this.state.status}</span>
      </div>
    );
  }
}

export default App;
