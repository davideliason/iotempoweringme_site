import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {clientData: "blue"}
    }
    
  render() {
    return (
      <div className="App">
        <p>IoT Empowering Me</p>
        <p>{this.state.clientData}</p>
      </div>
    );
  }
}

export default App;
