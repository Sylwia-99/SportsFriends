import React from 'react';
import Header from './Header';
import '../styles/EditProfile.css';
import {Api} from "../apiHandler/apiHandler";
import EditNameSurname from "./editProfile/EditNameSurname";
import EditPassword from "./editProfile/EditPassword";
import RemoveActivity from "./editProfile/RemoveActivity";
import AddActivity from "./editProfile/AddActivity";
import EditAvatar from "./editProfile/EditAvatar";

const EditProfileComponent = (props) =>{
    const allActivities = Api.activities();

    return (
        <div className="App">
            <Header {...props} user = {props.user} avatar = {props.avatar}/>
            <div className="Edit-information">
                <EditAvatar
                    avatar={props.avatar}
                />
                <EditNameSurname
                    name={props.user.name}
                    surname={props.user.surname}
                />
                <EditPassword/>
                <RemoveActivity
                    activities={props.activities}
                />
                <AddActivity
                    activities={allActivities}
                />
            </div>
        </div>
    );
}

export default EditProfileComponent;