import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../styles/Followers.css';
import {Api} from "../apiHandler/apiHandler";
import Follower from "./followerWatched/Follower";

const FollowersComponent = () =>{
    const [followerUsers, setFollowerUsers] = useState([]);
    const [watchedUsers, setWatchedUsers] = useState('');

    useEffect(() =>{
        getFollowerUsers();
        getWatchedUsers();
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

    function getWatchedUsers(){
        Api.watchers().then( response =>{
            if(response.status === 200){
                setWatchedUsers(response.data);
            }
        });
    }

    const handleAddWatchedUser = (key) => {
        Api.newWatchedUser(key.key).then( response =>{
            if(response.status === 200){
                console.log('Dodano obserwującego');
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
                    {   followerUsers.length!==0 ?
                            followerUsers.map((user) => {
                                return (<Follower
                                        key={user.id}
                                        avatar={user.avatar}
                                        name={user.name}
                                        surname={user.surname}
                                        id_user={user.id_user_follower}
                                        onClick={()=>handleAddWatchedUser({key:user.id_user_follower})}
                                        button={'Obserwuj'}
                                        follower={'follower'}
                                />)
                            }) :
                        <h4>Nikt Cię nie obserwuje</h4>
                    }
                </section>
            </main>
        </div>
    );


}

export default FollowersComponent;