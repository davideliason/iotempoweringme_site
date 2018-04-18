import React, { Component } from 'react';
import './App.css';
import PubNubReact from 'pubnub-react';

class App extends Component {
  constructor(props) {
        super(props);

        this.state = {
            Messages : ""
        };

        this.publishMessageToChannel = this.publishMessageToChannel.bind(this);

        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-c377ebaa-f828-40f5-8b64-9fef4ff4aeaa',
            subscribeKey: 'sub-c-8b9161d0-391a-11e8-9da7-9e748936d455'
        });

        this.pubnub.init(this);
    }
 
    componentWillMount() {
        this.pubnub.subscribe({
            channels: ['messageChannel'],
            withPresence: true
        });

       

        this.pubnub.getMessage('messageChannel', (msg) => {
            console.log(msg.message);
            this.setState({ Messages: msg});
        });

        this.pubnub.getStatus((st) => {
            console.log(st);

            this.pubnub.publish({
                message: "i am an original message",
                channel: 'messageChannel'
            });
        });
 
    }
 
    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: ['messageChannel']
        });
    }

    publishMessageToChannel(){
         this.pubnub.publish({
                message: "i am a new message",
                channel: 'messageChannel'
            });
    }

 
    render() {

        return (
            <div>
                {this.state.Messages.message}
                <button onClick={this.publishMessageToChannel}>click</button>
            </div>
        );
  }
}







export default App;
