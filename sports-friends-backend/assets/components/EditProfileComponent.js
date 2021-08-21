import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../styles/EditProfile.css';
import {Api} from "../apiHandler/apiHandler";
import EditNameSurname from "./editProfile/EditNameSurname";
import EditPassword from "./editProfile/EditPassword";
import RemoveActivity from "./editProfile/RemoveActivity";
import AddActivity from "./editProfile/AddActivity";
import EditAvatar from "./editProfile/EditAvatar";

const EditProfileComponent = () =>{
    const [user, setUser] = useState({
        name: '',
        surname: '',
        removeActivity: '',
        addActivity: '',
        errorMessage: ''
    });

    const [avatar, setAvatar] = useState();

    const [activities, setActivities] = useState( []);

    const [allActivities, setAllActivities] = useState([]);

    useEffect(() =>{
        getUser();
        getUserActivities();
        getActivities();
    }, []);

    function getUser(){
        Api.currentUser().then( response =>{
            if(response.status === 200){
                setUser({
                    email: response.data[0].email,
                    name: response.data[0].name,
                    surname: response.data[0].surname,
                    city: response.data[0].city,
                    street: response.data[0].street,
                });
                import(`../../src/uploads/${response.data[0].avatar}`)
                    .then(({default: url}) =>{
                            setAvatar( url);
                        }
                    )
            }
        })
    }

    function getUserActivities(){
        Api.currentUserActivities().then( response =>{
            if(response.status === 200) {
                setActivities( response.data);
            }
        });
    }

    function getActivities(){
        Api.activities().then( response =>{
            if(response.status === 200) {
                setAllActivities(response.data);
            }
        });
    }

    return (
        <div className="App">
            <Header/>
            <div className="Edit-information">
                <EditAvatar
                    avatar={avatar}
                />
                <EditNameSurname
                    name={user.name}
                    surname={user.surname}
                />
                <EditPassword/>
                <RemoveActivity
                    activities={activities}
                />
                <AddActivity
                    activities={allActivities}
                />
            </div>
        </div>
    );
}

export default EditProfileComponent;