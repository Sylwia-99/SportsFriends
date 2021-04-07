import React, {Component} from 'react';
import Header from './components/Header';
import './styles/Messages.css';
import {FiSend} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import avatar from './images/avatar.jpg';
import { withMedia } from 'react-media-query-hoc';

class Chat extends Component{
    render() {
        return (
            <div className="App">
                <Header/>
                <div className={window.innerWidth >= 600 ? "App-Chat" : "App-Chat-mobile"}>
                    <div className={window.innerWidth >= 600 ? "Friends-chat" : "Friends-chat-mobile"}>
                        <Link to={window.innerWidth >= 960 ? "/messages" : "/singleChat"} className="One-friend">
                            <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                            <h3>Imie Nazwisko</h3>
                        </Link>
                        <Link to={window.innerWidth >= 960 ? "/messages" : "/singleChat"} className="One-friend">
                            <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                            <h3>Imie Nazwisko</h3>
                        </Link>
                    </div>
                    <div className="Chat-place">
                        <div className="Chat">
                            <div className="One-friend-chat">
                                <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                                <div className="Message">
                                    <h3>Hej biegamy dzisiaj razem?</h3>
                                </div>
                            </div>
                        </div>
                        <div className="Send-message">
                            <form className="Send-message-form">
                                <input className="Send-input-chat"/>
                                <button className="Send-button-chat"><FiSend/></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withMedia(withRouter(Chat));