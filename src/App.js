import React, { Component } from 'react';
import './App.css';
import Routes from './components/Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>BibliaVest - Scoreboard</h2>
        </div>
        <Routes />
      </div>

    );
  }
}

export default App;
