import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sendGreenLights : false,
        practiceCount : 0
      };
      this.handleNumClick = this.handleNumClick.bind(this);
      this.handleGreenClick = this.handleGreenClick.bind(this);

    }

   handleNumClick() {
    this.setState(prevState => ({
      practiceCount: prevState.practiceCount + 1
    }));
  }

  handleGreenClick(){
    this.setState(prevState => ({
      sendGreenLights: !prevState.sendGreenLights
    }));
  }

  render() {

    return (
      <div className="App">
        <p>IoT Empowering Me</p>
        <SendGreenLightCommand sendGreenLights={this.state.sendGreenLights}/>
        <button onClick={this.handleNumClick}>Practice Count: {this.state.practiceCount}
        </button>
        <button onClick={this.handleGreenClick}>Green Lights {this.state.sendGreenLights}
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
