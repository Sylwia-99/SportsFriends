import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../styles/Followers.css';
import {Api} from "../apiHandler/apiHandler";
import Follower from "./followerWatched/Follower";
import storeFollowers from "../storeFollowers";
import * as actionCreators from "./actions/followers";

const FollowersComponent = (props) =>{
    const handleAddWatchedUser = (key) => {
        Api.newWatchedUser(key.key).then( response =>{
            if(response.status === 200){
                storeFollowers.dispatch(actionCreators.fetchWatchers());
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="App">
            <Header {...props} user = {props.user} avatar = {props.avatar}/>
            <main>
                <section className="Friends">
                    {   props.followers.length!==0 ?
                            props.followers.map((user, index) => {
                                return (<Follower
                                        key={index}
                                        id={user.id}
                                        avatar={user.avatar}
                                        name={user.name}
                                        surname={user.surname}
                                        id_user={user.id_user_follower}
                                        onClick={()=>handleAddWatchedUser({key:user.id_user_follower})}
                                        watchers={props.watchers}
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