import React, {Component} from 'react';
import Header from './components/Header';
import './styles/Notification.css';
import './styles/Messages.css';
import {withRouter} from "react-router";
import avatar from './images/avatar.jpg';
import { withMedia } from 'react-media-query-hoc';

class Notification extends Component{
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Notification">
                    <div className="One-friend">
                        <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                        <div className="Notification-option">
                            <h3>Imie Nazwisko chce Cię obserwować</h3>
                            <button className="Accept-button" type="submit">Akceptuj</button>
                            <button className="Reject-button" type="submit">Odrzuć</button>
                        </div>
                    </div>
                    <div className="One-friend">
                        <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                        <div className="Notification-option">
                            <h3>Imie Nazwisko chce Cię obserwować</h3>
                            <button className="Accept-button" type="submit">Akceptuj</button>
                            <button className="Reject-button" type="submit">Odrzuć</button>
                        </div>
                    </div>
                    <div className="One-friend">
                        <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                        <div className="Notification-option">
                            <h3>Imie Nazwisko chce Cię obserwować</h3>
                            <button className="Accept-button" type="submit">Akceptuj</button>
                            <button className="Reject-button" type="submit">Odrzuć</button>
                        </div>
                    </div>
                    <div className="One-friend">
                        <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                        <div className="Notification-option">
                            <h3>Imie Nazwisko chce Cię obserwować</h3>
                            <button className="Accept-button" type="submit">Akceptuj</button>
                            <button className="Reject-button" type="submit">Odrzuć</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withMedia(withRouter(Notification));