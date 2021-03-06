import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Api} from "../../apiHandler/apiHandler";

const Follower =  (props) =>{
    const[avatar, setAvatar] = useState('');
    const [isWatched, setIsWatched] = useState({
        isWatched: false
    })

    function getWatchedUsers(){
        Api.watchers().then( response =>{
            if(response.status === 200){
                const found = response.data.find(element => element.id_user_watcher === props.id_user);
                if(found){
                    setIsWatched({
                        isWatched: true
                    });
                }
            }

        });
    }

    useEffect(() =>{
        if(props.follower==='follower'){
            getWatchedUsers();
        }
        import(`../../../src/uploads/${props.avatar}`)
            .then(({default: url}) =>{
                    setAvatar( url);
                }
            )
    },[]);

    return (
        <ul key={props.key}>
            <li>
                <div className="Watched-friend">
                    <Link to={`/profile/${props.id_user_follower}`}>
                        <span>
                            <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                        </span>
                    </Link>
                    <h3>{props.name} {props.surname}</h3>
                    {
                        (isWatched.isWatched && props.follower==='follower') ?
                            <div
                                className="Watched-friend-info"
                            >
                                Obserwujesz
                            </div>
                            : null
                    }
                    {
                        (!isWatched.isWatched && props.follower==='follower') ?
                            <button
                                className="Remove-friend-button" onClick={props.onClick}
                            >
                                {props.button}
                            </button>
                            : null
                    }
                    {
                        props.follower!=='follower' ?
                            <button
                                className="Remove-friend-button" onClick={props.onClick}
                            >
                                {props.button}
                            </button>
                            :
                            null
                    }
                </div>
            </li>
        </ul>
    )
}

export default Follower;