import React, { Component } from 'react';
import FileItem from './fileItem/FileItem';

const style = {
  margin: '20px auto 0',
  padding: '20px',
  border: '1px solid black'
}

const styleH1 = {
  fontSize: 'larger',
  textAlign: 'center',
  padding: '20px',
  margin: '20px auto'
}

class App extends Component {
  render() {
    return (
      <div style={style}>
        <h1 style={styleH1}>File Test</h1>
        <FileItem />
        <FileItem />
        <FileItem />
      </div>
    );
  }
}

export default App;
