import React, { Component } from 'react';
import './App.css';
import Background from './Background.js';
import PubNubReact from 'pubnub-react';

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            msg : ""
        };

        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-c377ebaa-f828-40f5-8b64-9fef4ff4aeaa',
            subscribeKey: 'sub-c-8b9161d0-391a-11e8-9da7-9e748936d455'
        });
        this.pubnub.init(this);
    }
 
    componentWillMount() {
        this.pubnub.subscribe({
            channels: ['channel1'],
            withPresence: true
        });
 
        this.pubnub.getMessage('channel1', (msg) => {
            console.log(msg);
            this.setState({
                msg: msg.channel
            })
        });
 
        this.pubnub.getStatus((st) => {
            this.pubnub.publish({
                message: 'hello world from react',
                channel: 'channel1'
            });
            this.pubnub.publish({
                message: 'hello world again from react',
                channel: 'channel1'
            });
        });
    }
 
    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: ['channel1']
        });
    }
 
    render() {
        const messages = this.pubnub.getMessage('channel1');
        return (
            <div>
                <ul>
                    {messages.map((m, index) => <li key={'message' + index}>{m.message}</li>)}
                </ul>
                <h3>{this.state.msg}</h3>
            </div>
        );
  }
}







export default App;
