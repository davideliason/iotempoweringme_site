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
      this.handleGreenLEDClick = this.handleGreenLEDClick.bind(this);

    }

   handleNumClick() {
    this.setState(prevState => ({
      practiceCount: prevState.practiceCount + 1
    }));
  }

  handleGreenLEDClick(){
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
        <button onClick={this.handleGreenLEDClick}>Green LED {this.state.sendGreenLights}
        </button>
      </div>
    );
  }
}

function SendGreenLightCommand(props){
  const yesSendGreenLight = props.sendGreenLights;
  if (yesSendGreenLight){
    return (<p>green LED lights up! :)</p>)
  }
  else{
    return (<p>no green LED :(</p>)
  }
}





export default App;
