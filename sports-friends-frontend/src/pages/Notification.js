import React from 'react';
import Header from '../components/Header';
import './Notification.css';

function Notification() {
    return (
        <div className="App">
            <Header/>
            <div className="Notification">
                <div className="One-friend">
                    <img className="Medium-avatar" src="images/avatar.jpg"></img>
                    <div className="Notification-option">
                        <h3>Imie Nazwisko chce Cię obserwować</h3>
                        <button className="Accept-button" type="submit" >Akceptuj</button>
                        <button className="Reject-button" type="submit" >Odrzuć</button>
                    </div>
                </div>
                <div className="One-friend">
                    <img className="Medium-avatar" src="images/avatar.jpg"></img>
                    <div className="Notification-option">
                        <h3>Imie Nazwisko chce Cię obserwować</h3>
                        <button className="Accept-button" type="submit" >Akceptuj</button>
                        <button className="Reject-button" type="submit" >Odrzuć</button>
                    </div>
                </div>
                <div className="One-friend">
                    <img className="Medium-avatar" src="images/avatar.jpg"></img>
                    <div className="Notification-option">
                        <h3>Imie Nazwisko chce Cię obserwować</h3>
                        <button className="Accept-button" type="submit" >Akceptuj</button>
                        <button className="Reject-button" type="submit" >Odrzuć</button>
                    </div>
                </div>
                <div className="One-friend">
                    <img className="Medium-avatar" src="images/avatar.jpg"></img>
                    <div className="Notification-option">
                        <h3>Imie Nazwisko chce Cię obserwować</h3>
                        <button className="Accept-button" type="submit" >Akceptuj</button>
                        <button className="Reject-button" type="submit" >Odrzuć</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification;