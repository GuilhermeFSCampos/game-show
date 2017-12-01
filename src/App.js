import React, { Component } from 'react';
import './App.css';
import Routes from './components/Routes';
import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo2" alt="logo" />
        </div>
        <Routes />
      </div>

    );
  }
}

export default App;
