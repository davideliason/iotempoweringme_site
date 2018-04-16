import React, { Component } from 'react';
import './App.css';
import Background from './Background.js';
import PubNubReact from 'pubnub-react';

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            msgsGPSCoordinates : [],
            msgsMessages : []
        };

        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-c377ebaa-f828-40f5-8b64-9fef4ff4aeaa',
            subscribeKey: 'sub-c-8b9161d0-391a-11e8-9da7-9e748936d455'
        });
        this.pubnub.init(this);
    }
 
    componentWillMount() {
        this.pubnub.subscribe({
            channels: ['gpscoordinates','msgsMessages'],
            withPresence: true
        });

        //  this.pubnub.subscribe({
        //     channels: ['channel2'],
        //     withPresence: true
        // });
 
        this.pubnub.getMessage('gpscoordinates', (msg) => {
            this.setState({
                msgsGPSCoordinates: [...this.state.msgsGPSCoordinates,msg.message]
            })
        });

        this.pubnub.getMessage('msgsMessages', (msg) => {
            this.setState({
                msgsMessages: [...this.state.msgsMessages,msg.message]
            })
        });
 
        this.pubnub.getStatus((st) => {
            this.pubnub.publish({
                message: {
                           gps : "here",
                         },
                channel: 'gpscoordinates'
            });

            this.pubnub.publish({
                message: { 
                            msg : "need help"
                          },
                channel: 'msgsMessages'
            });
        });
    }
 
    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: ['gpscoordinates','msgsMessages']
        });
    }
 
    render() {
        const msgsGPSCoordinates = this.pubnub.getMessage('gpscoordinates');
        const msgsMessages = this.pubnub.getMessage('msgsMessages');

        return (
            <div>
                <ul>
                    {msgsGPSCoordinates.map((m, index) => <li key={'message' + index}>{m.message.gps}</li>)}
                </ul>

                <ul>
                    {msgsMessages.map((m, index) => <li key={'message' + index}>{m.message.msg}</li>)}
                </ul>
           

            </div>
        );
  }
}







export default App;
