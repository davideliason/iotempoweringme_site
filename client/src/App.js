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
        
         <button onClick={this.handleClick}>
          {this.state.clientData}
         </button>
      </div>
    );
  }
}

export default App;
