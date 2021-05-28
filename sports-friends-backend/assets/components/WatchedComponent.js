import React, {useEffect, useState} from 'react';
import Header from './Header';
import {Api} from "../apiHandler/apiHandler";
import Follower from "./followerWatched/Follower";

const WatchedComponent = () =>{
    const [watchedUsers, setWatchedUsers] = useState([]);

    useEffect(() =>{
        getWatchedUsers();
    }, [])

    function getWatchedUsers(){
        Api.watchers().then( response =>{
            if(response.data !== []){
                setWatchedUsers(response.data);
            }
        });
    }

    const handleRemoveWatchedUser = (key) => {
        Api.removeWatchedUser(key.key).then( response =>{
            if(response.status === 200){
                console.log('Usunięto obserwowanego użytkownika');
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="App">
            <Header/>
            <main>
                <section className="Friends">
                    { watchedUsers.length!==0 ?
                        watchedUsers.map((user) => {
                            return (<Follower
                                key={user.id}
                                avatar={user.avatar}
                                name={user.name}
                                surname={user.surname}
                                id_user={user.id_user_watcher}
                                onClick={()=>handleRemoveWatchedUser({key:user.id_user_watcher})}
                                button={'Usuń'}
                            />)
                    }) :
                        <h4>Nie obserwujesz nikogo</h4>
                    }
                </section>
            </main>
        </div>
    );



}

export default WatchedComponent;