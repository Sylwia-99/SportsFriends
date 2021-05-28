import React from 'react';
import {useParams} from "react-router";
import ProfileComponent from "../components/ProfileComponent";

const  Profile =()=>{
    const { id} = useParams();
    return (
        <>
            <ProfileComponent id={id}/>
        </>
    );
}

export default Profile;