import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../styles/Notification.css';
import '../styles/Messages.css';
import {Api} from "../apiHandler/apiHandler";
import Notification from "./Notification";

const NotificationComponent = () =>{
    const [followerUsers, setFollowerUsers] = useState([]);

    useEffect(() =>{
        getFollowerUsers();
    }, [])

    function getFollowerUsers(){
        Api.followers().then( response =>{
            if(response.status === 200){
                if(response.data !== []){
                    setFollowerUsers(response.data);
                }
            }
        });
    }

    return (
        <div className="App">
            <Header/>
            <div className="Notification">
                {   followerUsers.length!==0 ?
                    followerUsers.map((user) =>{
                        return (<Notification
                            key={user.id}
                            avatar={user.avatar}
                            name={user.name}
                            surname={user.surname}
                            id_user_follower={user.id_user_follower}
                        />)
                    }) :
                    <h4 >Brak powiadomień</h4>
                }
            </div>
        </div>
    )
}

export default NotificationComponent;