import React, { Component } from 'react';
import './App.css';
import Background from './Background.js';

const publish_key =  'pub-c-c377ebaa-f828-40f5-8b64-9fef4ff4aeaa'; // your pub key
const subscribe_key  = 'sub-c-8b9161d0-391a-11e8-9da7-9e748936d455'; // your sub key
 
const pubnub = require('pubnub').init({                         
  publish_key   : publish_key,
  subscribe_key : subscribe_key,
  ssl: true,
  uuid: username
});
 
const channel = 'iotempoweringme';

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
        <h2>IoT Empowering Me</h2>
        <SendGreenLightCommand sendGreenLights={this.state.sendGreenLights}/>
        <button onClick={this.handleNumClick}>Practice Count: {this.state.practiceCount}
        </button>
        <button onClick={this.handleGreenLEDClick}>Green LED {this.state.sendGreenLights}
        </button>
        <Background />
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
