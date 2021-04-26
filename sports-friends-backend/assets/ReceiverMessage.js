import React, {Component} from 'react';
import MessageNav from './components/MessageNav';
import {withRouter} from "react-router";
import Header from "./components/Header";
import avatar from './images/avatar.jpg';
import './styles/ReceiverSendMessage.css';
import axios from "axios";

class ReceiverMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            receivedMessages: []
        }
    }

    componentDidMount() {
        this.getReceivedMessages();
    }

    getReceivedMessages(){
        axios.get(`http://localhost:8000/getUserReceivedMessages`).then(receivedMessages => {
            this.setState({ receivedMessages: receivedMessages.data})
        })
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Messages">
                    <MessageNav/>
                    <div className="Receivers">
                        <div className='Receiver-messages'>
                            <h1>Odebrane</h1>
                            <ul className="Rec-messages-list">
                                {
                                    this.state.receivedMessages.contents!=null?
                                        this.state.receivedMessages.map(receivedMessage =>
                                        <li>
                                            <div className="One-friend">
                                                <img className="Medium-avatar" src={receivedMessage.avatar}/>
                                                <h4>{receivedMessage.name} {receivedMessage.surname}</h4>
                                            </div>
                                            <p>{receivedMessage.contents}</p>
                                        </li>)
                                        :
                                        <li>
                                            <div className="One-friend">
                                                <h4>Brak wiadomości</h4>
                                            </div>
                                        </li>
                                }
                            </ul>
                        </div>
                        <div className='Receiver-message'>
                            <div className="One-friend">
                                <h4>Od:</h4>
                                <img className="Medium-avatar" src={avatar}/>
                                <h4>Imie Nazwisko</h4>
                            </div>
                            <p>tresc</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ReceiverMessage);