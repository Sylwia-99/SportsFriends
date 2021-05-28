import React, {useEffect, useState} from 'react'
import {Api} from "../apiHandler/apiHandler";

const Notification =  (props) =>{
    const[avatar, setAvatar] = useState('');
    const [isWatched, setIsWatched] = useState({
        isWatched: false
    })

    function getWatchedUsers(){
        Api.watchers().then( response =>{
            if(response.status === 200){
                const found = response.data.find(element => element.id_user_watcher === props.id_user_follower);
                if(found){
                    setIsWatched({
                        isWatched: true
                    });
                }
            }

        });
    }

    const handleAddWatchedUser = (key) => {
        Api.newWatchedUser(key.key).then( response =>{
            if(response.status === 200){
                console.log('Dodano obserwującego');
                setIsWatched({
                    isWatched: true
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() =>{
        getWatchedUsers();
        import(`../../src/uploads/${props.avatar}`)
            .then(({default: url}) =>{
                    setAvatar( url);
                }
            )
    },[]);

    return (
        <div key={props.key} className="One-friend">
            <span>
                <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
            </span>
            <div className="Notification-option">
                <h3>{props.name} {props.surname} zaczął Cię obserwować</h3>
                {
                    isWatched.isWatched ?
                        <button className="Accept-button">Obserwujesz</button>
                        :
                        <button className="Accept-button" onClick={()=>handleAddWatchedUser({key:props.id_user_follower})}>Obserwuj</button>

                }
                <button className="Reject-button" type="submit">Odrzuć</button>
            </div>
        </div>
    )
}

export default Notification;