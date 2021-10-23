import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../styles/YourProfile.css';
import {BiFootball} from 'react-icons/bi';
import {FaRunning, FaMapMarkerAlt, FaSwimmer} from 'react-icons/fa';
import {MdDirectionsBike} from 'react-icons/md';
import {CgGym} from 'react-icons/cg';
import {Link} from 'react-router-dom';

import {Api} from '../apiHandler/apiHandler';
import Activity from "./Activity";

const YourProfileComponent = (props) =>{

    //const [activities, setActivities] = useState ([]);

    /*function getUserActivities(){
        Api.currentUserActivities().then( response =>{
            if(response.status === 200) {
                setActivities(response.data)
            }
        });
    }*/

    function logout(){
        Api.logout().then( response =>{
            if(response.status === 200){
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                localStorage.removeItem('roles');
                console.log('wylogowano');
            }
        }).then(() => location.href = '/login')
            .catch(function (error) {
                console.log(error);
            });
    }

    /*useEffect(() =>{
        getUserActivities();
    }, []);*/

    return (
        <div className="App">
            <Header {...props} user = {props.user} avatar = {props.avatar}/>
            <div className="Your-information">
                <div className="Profile">
                        <span className="big">
                            <img className="Big-avatar" src={props.avatar} alt={"this is avatar image"}/>
                        </span>
                    <h2>{props.user.name} {props.user.surname}</h2>
                </div>
                <div className="AboutMe">
                    <h2>O mnie</h2>
                    <hr/>
                    <h5><FaMapMarkerAlt/> {props.user.city}, ul. {props.user.street}</h5>
                    <h2>Moje Aktywności</h2>
                    <hr/>
                    <div className="Activities">
                        {props.activities.map((activity, i) =>{
                                return(<Activity
                                    key={i}
                                    name={activity.name}
                                />)
                            }
                        )}
                    </div>
                </div>
            </div>
            <div className="Edition">
                <Link to="/editProfile">
                    <button className="Edition-button">Edycja Profilu</button>
                </Link>
                <Link to="/watched">
                    <button className="Edition-button">Obserwowani</button>
                </Link>
                <Link to="/followers">
                    <button className="Edition-button">Obserwujący</button>
                </Link>
                <button className="Edition-button" onClick={logout}>Wyloguj</button>
            </div>
        </div>
    );
}

export default YourProfileComponent;