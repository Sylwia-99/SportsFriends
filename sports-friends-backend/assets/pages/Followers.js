import React from 'react';
import FollowersComponent from "../components/FollowersComponent";

const Followers = (props) =>{
    return (
        <>
            <FollowersComponent {...props} user = {props.user} avatar = {props.avatar}/>
        </>
    );
}

export default Followers;