import React, { Component } from 'react';
import parser from 'fast-xml-parser';
import postFileToAPI from './services'

const initialState = {
  validFiles: [],
  invalidFiles: [],
  succeededFiles: [],
  unsucceededFiles: []
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState } ;
  }

  postValidFiles = () => {
    return Promise.all(Array.from(this.state.validFiles).map(file => postFileToAPI(file).then(succeededFile => {
      this.setState({ succeededFiles: [...this.state.succeededFiles, succeededFile]});
    }).catch(error => {
      if (error.isInvalid) {
        this.setState({ invalidFiles: [...this.state.invalidFiles, error.file]});
      } else {
        this.setState({ unsucceededFiles: [...this.state.unsucceededFiles, error.file]});
      }
    })));
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

  formatFileStatus(prefix, files) {
    return files.length === 0 ? null : <p>{prefix + files.map((file) => `${file.name}`).join(', ')}</p>
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
        {this.formatFileStatus('Succeeded file(s): ', this.state.succeededFiles)}
        {this.formatFileStatus('Unsucceeded file(s): ', this.state.unsucceededFiles)}
        {this.formatFileStatus('Invalid file(s): ', this.state.invalidFiles)}
      </div>
    );
  }
}

export default App;
