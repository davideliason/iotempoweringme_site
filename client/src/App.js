import React, { Component } from 'react';
import './App.css';
import PubNubReact from 'pubnub-react';

class App extends Component {
  constructor(props) {
        super(props);

        this.state = {
            messages : ""
        };

        this.publishMessageToChannel = this.publishMessageToChannel.bind(this);

        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-c377ebaa-f828-40f5-8b64-9fef4ff4aeaa',
            subscribeKey: 'sub-c-8b9161d0-391a-11e8-9da7-9e748936d455'
        });

        this.pubnub.init(this);
    }
 
    componentWillMount() {

        this.pubnub.getStatus();

        this.pubnub.subscribe({
            channels: ['messageChannel'],
            withPresence: true
        });

        this.pubnub.getMessage('messageChannel', (msg) => {
            this.setState({ messages: msg});
        });

        this.pubnub.getStatus((st) => {
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
                message: "i am a new message" + Math.floor((Math.random() * 10) + 1) ,
                channel: 'messageChannel'
            });
    }

 
    render() {
            const messages = this.state.messages;
        return (
            <div>
                <h3> Client Messages</h3>
                {messages.message}
                <button onClick={this.publishMessageToChannel}>click</button>
            </div>
        );
  }
}







export default App;
