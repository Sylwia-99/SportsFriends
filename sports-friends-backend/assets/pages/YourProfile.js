import React from 'react';
import YourProfileComponent from "../components/YourProfileComponent";
const YourProfile = (props) =>{
    return (
        <>
            <YourProfileComponent {...props} user = {props.user} avatar = {props.avatar} activities = {props.activities} />
        </>
    );
}
export default YourProfile;