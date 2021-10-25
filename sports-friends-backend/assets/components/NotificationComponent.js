import React from 'react';
import Header from './Header';
import '../styles/Notification.css';
import '../styles/Messages.css';
import Notification from "./Notification";

const NotificationComponent = (props) =>{
    return (
        <div className="App">
            <Header {...props} user = {props.user} avatar = {props.avatar}/>
            <div className="Notification">
                {   props.followers.length!==0 ?
                    props.followers.map((user, index) =>{
                        return (<Notification
                            key={index}
                            id={user.id}
                            avatar={user.avatar}
                            name={user.name}
                            surname={user.surname}
                            id_user_follower={user.id_user_follower}
                            watchers={props.watchers}
                        />)
                    }) :
                    <h4 >Brak powiadomień</h4>
                }
            </div>
        </div>
    )
}

export default NotificationComponent;