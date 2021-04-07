import React, {Component} from 'react';
import Header from './components/Header';
import './styles/Messages.css';
import {FiSend} from 'react-icons/fi';
import {withRouter} from "react-router";
import avatar from "./images/avatar.jpg";

class SingleChat extends Component{
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="App-Chat-mobile">
                    <div className="Chat-place">
                        <div className="Chat-mobile">
                            <div className="One-friend-chat">
                                <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                                <div className="Message">
                                    <h3>Hej biegamy dzisiaj razem?</h3>
                                </div>
                            </div>
                        </div>
                        <div className="Send-message-mobile">
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

export default withRouter(SingleChat);