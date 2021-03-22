import React from 'react';
import Header from '../components/Header';
import './Messages.css';
import {FiSend} from 'react-icons/fi';
import {Link} from 'react-router-dom';

function SingleChat() {
    return (
        <div className="App">
            <Header/>
            <div className="App-Messages-mobile">
                <div className="Chat-place">
                    <div className="Chat-mobile">
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

export default SingleChat;