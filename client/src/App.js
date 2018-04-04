import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {clientData: "blue"};
      this.handleClick = this.handleClick.bind(this);
    }

   handleClick() {
    this.setState(prevState => ({
      clientData: prevState.clientData + "+"
    }));
  }

  render() {
    return (
      <div className="App">
        <p>IoT Empowering Me</p>
        <SOSClient />
         <button onClick={this.handleClick}>
          {this.state.clientData}
         </button>
      </div>
    );
  }
}

class SOSClient extends Component {
  constructor(props) {
    super(props);
    this.state = {geolocation: "0"}
  }

  render(){
    return (
      <div>
          <p>{this.state.geolocation}</p>
      </div>
    )
  }
}

export default App;
