import React, { Component } from 'react';
import './App.css';
import Background from './Background.js';
import PubNubReact from 'pubnub-react';

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            msgsChannel1 : [],
            msgsChannel2 : []
        };

        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-c377ebaa-f828-40f5-8b64-9fef4ff4aeaa',
            subscribeKey: 'sub-c-8b9161d0-391a-11e8-9da7-9e748936d455'
        });
        this.pubnub.init(this);
    }
 
    componentWillMount() {
        this.pubnub.subscribe({
            channels: ['channel1','channel2'],
            withPresence: true
        });

        //  this.pubnub.subscribe({
        //     channels: ['channel2'],
        //     withPresence: true
        // });
 
        this.pubnub.getMessage('channel1', (msg) => {
            this.setState({
                msgsChannel1: [...this.state.msgsChannel1,msg.message]
            })
        });

        this.pubnub.getMessage('channel2', (msg) => {
            this.setState({
                msgsChannel2: [...this.state.msgsChannel2,msg.message]
            })
        });
 
        this.pubnub.getStatus((st) => {
            this.pubnub.publish({
                message: {
                           gps : "here",
                         },
                channel: 'channel1'
            });

            this.pubnub.publish({
                message: { 
                            sos : "need help"
                          },
                channel: 'channel2'
            });
        });
    }
 
    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: ['channel1','channel2']
        });
    }
 
    render() {
        const messagesChannel1 = this.pubnub.getMessage('channel1');
        const messagesChannel2 = this.pubnub.getMessage('channel2');

        return (
            <div>
                <ul>
                    {messagesChannel1.map((m, index) => <li key={'message' + index}>{m.message.gps}</li>)}
                </ul>

                <ul>
                    {messagesChannel2.map((m, index) => <li key={'message' + index}>{m.message.sos}</li>)}
                </ul>
           

            </div>
        );
  }
}







export default App;
