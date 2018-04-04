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
    const geoNumber = this.state.geolocation;
    const geoNumberText = "0" ? (
        <h2>Zero!</h2>
      ) : (
        <h2> Not zero</h2>
      )

    return (
      <div>
          <p>{this.state.geolocation}</p>
          <p>This is from state: {geoNumber}</p>
          {geoNumberText}
      </div>
    )
  }
}

export default App;
