import React, {Component} from 'react';
import MessageNav from './components/MessageNav';
import {withRouter} from "react-router";
import Header from "./components/Header";
import './styles/NewMessage.css';

class NewMessage extends Component{
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="New-Message">
                    <MessageNav/>
                    <form className="Message-form">
                        <input className="Receiver" placeholder="Do"/>
                        <input className="Message-title" placeholder="Temat"/>
                        <input className="Message-input" placeholder="Wiadomość"/>
                        <button className="Send" type="submit"> Wyślij wiadomość</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(NewMessage);