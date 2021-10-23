import React from 'react';
import EditProfileComponent from '../components/EditProfileComponent';

const EditProfile = (props) =>{
    return (
        <>
            <EditProfileComponent {...props} user = {props.user} avatar = {props.avatar} activities = {props.activities}/>
        </>
    );
}
export default EditProfile;