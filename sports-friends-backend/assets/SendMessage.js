import React, {Component} from 'react';
import MessageNav from './components/MessageNav';
import {withRouter} from "react-router";
import Header from "./components/Header";
import './styles/ReceiverSendMessage.css';
import avatar from "./images/avatar.jpg";

class SendMessage extends Component{
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
                                <li>
                                    <div className="One-friend">
                                        <img className="Medium-avatar" src={avatar}/>
                                        <h4>Imie Nazwisko</h4>
                                    </div>
                                    <p>temat</p>
                                </li>
                                <li>
                                    <div className="One-friend">
                                        <img className="Medium-avatar" src={avatar}/>
                                        <h4>Imie Nazwisko</h4>
                                    </div>
                                    <p>temat</p>
                                </li>
                            </ul>
                        </div>
                        <div className='Receiver-message'>
                            <h2>Temat</h2>
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