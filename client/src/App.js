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
        <SendGreenLightCommand sendGreenLights="true"/>
         <button onClick={this.handleClick}>Practice Count: {this.state.practiceCount}
         </button>
      </div>
    );
  }
}

function SendGreenLightCommand(props){
  const yesSendGreenLight = props.sendGreenLights;
  if (yesSendGreenLight){
    return (<p>green lights</p>)
  }
  else{
    return (<p>not green lights</p>)
  }
}





export default App;
