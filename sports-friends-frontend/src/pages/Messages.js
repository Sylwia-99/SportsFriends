import React from 'react';
import Header from '../components/Header';
import './Messages.css';
import {FiSend} from 'react-icons/fi';
import {Link} from 'react-router-dom';

function Messages() {
    return (
        <div className="App">
            <Header/>
            <div className={window.innerWidth >=600 ? "App-Messages" : "App-Messages-mobile"}>
                <div className={window.innerWidth >=600 ? "Friends-chat" : "Friends-chat-mobile"}>
                    <Link to={window.innerWidth >=960 ? "/messages" : "/singleChat"} className="One-friend">
                        <img className="Medium-avatar" src="images/avatar.jpg"></img>
                        <h3>Imie Nazwisko</h3>
                    </Link>
                    <Link to={window.innerWidth >=960 ? "/messages" : "/singleChat"} className="One-friend">
                        <img className="Medium-avatar" src="images/avatar.jpg"></img>
                        <h3>Imie Nazwisko</h3>
                    </Link>
                </div>
                <div className="Chat-place">
                    <div className="Chat">
                        <div className="One-friend-chat">
                            <img className="Medium-avatar" src="images/avatar.jpg"></img>
                            <div className="Message">
                                <h3>Hej biegamy dzisiaj razem?</h3>
                            </div>
                        </div>
                    </div>
                    <div className="Send-message">
                        <form className="Send-message-form">
                            <input className="Send-input-chat"></input>
                            <button className="Send-button-chat"><FiSend/></button> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;