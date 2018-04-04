import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sendGreenLights : false,
        sendRedLights: false,
        practiceCount : 0
      };
      this.handleClick = this.handleClick.bind(this);
    }

   handleClick() {
    this.setState(prevState => ({
      practiceCount: prevState.practiceCount + 1
    }));
  }

  render() {

    return (
      <div className="App">
        <p>IoT Empowering Me</p>
         <button onClick={this.handleClick}>Practice Count: {this.state.practiceCount}
         </button>
      </div>
    );
  }
}



export default App;
