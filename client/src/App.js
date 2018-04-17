import React, { Component } from 'react';
import './App.css';
import PubNubReact from 'pubnub-react';

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            msgsGPSCoordinates : [],
            msgsMessages : [],
            msgsTimestamps : []
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
            channels: ['msgsGPSCoordinates','msgsMessages','msgsTimestamps'],
            withPresence: true
        });

        //  this.pubnub.subscribe({
        //     channels: ['channel2'],
        //     withPresence: true
        // });
 
        this.pubnub.getMessage('msgsGPSCoordinates', (msg) => {
            this.setState({
                msgsGPSCoordinates: [...this.state.msgsGPSCoordinates,msg.message]
            });
            console.log('msgsGPSCoordinates', (msg) => {
                console.log(msg);
            });
        });

        this.pubnub.getMessage('msgsMessages', (msg) => {
            this.setState({
                msgsMessages: [...this.state.msgsMessages,msg.message]
            })
        });

        this.pubnub.getMessage('msgsTimestamps', (msg) => {
            this.setState({
                msgsTimestamps: [...this.state.msgsTimestamps,msg.message]
            })
        });

        this.pubnub.getStatus((st) => {
            this.pubnub.publish({
                message: {
                           gps : "here",
                         },
                channel: 'msgsGPSCoordinates'
            });

            this.pubnub.publish({
                message: { 
                            msg : "need help"
                          },
                channel: 'msgsMessages'
            });

             this.pubnub.publish({
                message: { 
                            timestamp : "right now"
                          },
                channel: 'msgsTimestamps'
            });
        });
 
    }
 
    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: ['msgsGPSCoordinates','msgsMessages','msgsTimestamps']
        });
    }

    publishMessageToChannel(){
            console.log("hello button was clicked");
            this.pubnub.publish({
                message: {
                           gps : "helloooooo gps",
                         },
                channel: 'msgsGPSCoordinates'
            });
        
    }
 
    render() {
        const msgsGPSCoordinates = this.pubnub.getMessage('msgsGPSCoordinates');
        const msgsMessages = this.pubnub.getMessage('msgsMessages');
        const msgsTimestamps = this.pubnub.getMessage('msgsTimestamps');


        return (
            <div>
                <ul>
                    {msgsGPSCoordinates.map((m, index) => <li key={'message' + index}>{m.message.gps}</li>)}
                </ul>

                <ul>
                    {msgsMessages.map((m, index) => <li key={'message' + index}>{m.message.msg}</li>)}
                </ul>

                <ul>
                    {msgsTimestamps.map((m, index) => <li key={'message' + index}>{m.message.timestamp}</li>)}
                </ul>
                <button onClick = {this.publishMessageToChannel}>click</button>

           

            </div>
        );
  }
}







export default App;
