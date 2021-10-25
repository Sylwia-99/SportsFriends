import React from 'react';
import Header from './Header';
import {Api} from "../apiHandler/apiHandler";
import Follower from "./followerWatched/Follower";
import * as actionCreators from "./actions/followers";
import storeFollowers from "../storeFollowers";

const WatchedComponent = (props) =>{

    const handleRemoveWatchedUser = (key) => {
        Api.removeWatchedUser(key.key).then( response =>{
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
                    { props.watchers.length!==0 ?
                        props.watchers.map((user, index) => {
                            return (<Follower
                                key={index}
                                id={user.id}
                                avatar={user.avatar}
                                name={user.name}
                                surname={user.surname}
                                id_user={user.id_user_watcher}
                                onClick={()=>handleRemoveWatchedUser({key:user.id_user_watcher})}
                                watchers={props.watchers}
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