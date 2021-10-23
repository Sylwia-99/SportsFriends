import React from 'react';
import NotificationComponent from "../components/NotificationComponent";
const Notification = (props) => {
    return (
        <>
            <NotificationComponent {...props} user = {props.user} avatar = {props.avatar}/>
        </>
    )
}

export default Notification;