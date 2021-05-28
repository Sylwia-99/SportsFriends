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

const YourProfileComponent = () =>{
    const [user, setUser] = useState({
        id: '',
        user: '',
        email: '',
        name: '',
        surname: '',
        city: '',
        street: '',
    });

    const [avatar, setAvatar] = useState();

    const [activities, setActivities] = useState ([]);

    function getUser(){
        Api.currentUser().then( response =>{
            if(response.status === 200){
                setUser({
                    id:  response.data[0].id,
                    email: response.data[0].email,
                    name: response.data[0].name,
                    surname: response.data[0].surname,
                    city: response.data[0].city,
                    street: response.data[0].street,
                });
                import(`../../src/uploads/${response.data[0].avatar}`)
                    .then(({default: url}) =>{
                            setAvatar(url);
                        }
                    )
            }
        })
    }

    function getUserActivities(){
        Api.currentUserActivities().then( response =>{
            if(response.status === 200) {
                setActivities(response.data)
            }
        });
    }

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

    useEffect(() =>{
        getUser();
        getUserActivities();
    }, []);

    return (
        <div className="App">
            <Header/>
            <div className="Your-information">
                <div className="Profile">
                        <span className="big">
                            <img className="Big-avatar" src={avatar} alt={"this is avatar image"}/>
                        </span>
                    <h2>{user.name} {user.surname}</h2>
                </div>
                <div className="AboutMe">
                    <h2>O mnie</h2>
                    <hr/>
                    <h5><FaMapMarkerAlt/> {user.city}, ul. {user.street}</h5>
                    <h2>Moje Aktywności</h2>
                    <hr/>
                    <div className="Activities">
                        {activities.map((activity, i) =>{
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