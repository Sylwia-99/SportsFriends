import React, {Component} from 'react';
import MessageNav from './components/MessageNav';
import {withRouter} from "react-router";
import Header from "./components/Header";
import './styles/ReceiverSendMessage.css';
import avatar from "./images/avatar.jpg";
import axios from "axios";

class SendMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            sentMessages: []
        }
    }

    componentDidMount() {
        this.getSentMessages();
    }

    getSentMessages(){
        axios.get(`http://localhost:8000/getUserSentMessages`).then(sentMessages => {
            this.setState({ sentMessages: sentMessages.data})
        })
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Messages">
                    <MessageNav/>
                    <div className="Sends">
                        <div className='Receiver-messages'>
                            <h1>Wysłane</h1>
                            <ul className="Rec-messages-list">
                                {
                                    this.state.sentMessages.contents!=null ?
                                        this.state.sentMessages.map(sentMessage =>
                                                <li>
                                                    <div className="One-friend">
                                                        <img className="Medium-avatar" src={sentMessage.avatar}/>
                                                        <h4>{sentMessage.name} {sentMessage.surname}</h4>
                                                    </div>
                                                    <p>{sentMessage.contents}</p>
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
                                <h4>Do:</h4>
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

export default withRouter(SendMessage);