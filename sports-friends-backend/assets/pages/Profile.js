import React from 'react';
import {useParams} from "react-router";
import ProfileComponent from "../components/ProfileComponent";

const  Profile =(props)=>{
    const { id} = useParams();
    return (
        <>
            <ProfileComponent id={id} {...props} user = {props.user} avatar = {props.avatar}/>
        </>
    );
}

export default Profile;