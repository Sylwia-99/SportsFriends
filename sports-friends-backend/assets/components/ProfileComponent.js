import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../styles/YourProfile.css';
import { FaMapMarkerAlt} from 'react-icons/fa';
import {Api} from "../apiHandler/apiHandler";
import Activity from "./Activity";
import {addMessage, setLastMessage} from "./actions/conversation";
import {useLocation} from "react-router";
import * as actionCreators from "./actions/followers";
import storeFollowers from "../storeFollowers";

const ProfileComponent = (props) =>{
    const location = useLocation();
    const { email, name, surname, avatar, city, street, activities} = location.state;

    const [message, setMessage] = useState({
        contents: ''
    })

    const [isWatched, setIsWatched] = useState({
        isWatched: false
    })

    useEffect(() =>{
        userIsWatched()
    }, [props.id]);

    function userIsWatched(){
        const found = props.watchers.find(element => element.id_user_watcher === props.id);
        if(found){
            setIsWatched({
                isWatched: true
            });
        }
    }

    function addUserToWatched (){
        Api.newWatchedUser(props.id).then( response =>{
            if(response.status === 200){
                storeFollowers.dispatch(actionCreators.fetchWatchers());
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    function handleChange (e){
        setMessage({
            contents: e.target.value
        });
    }

    function sendMessage (){
        Api.createConversation(props.id).then(response => {
            Api.sendMessage(message.contents, response.data.id).then(({data}) => {
                dispatch(setLastMessage(data, response.data.id));
                return dispatch(addMessage(data, response.data.id))
            });
            setMessage({
                contents: ''
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    function removeUser (){
        Api.removeUser(props.id).then( response =>{
            if(response.status === 200) {
                alert('Usunięto użytkownika');
            }
        });
    }
    return (
        <div className="App">
            <Header {...props} user = {props.user} avatar = {props.avatar}/>
            <div className="Your-information">
                <div className="Profile">
                        <span className="big">
                            <img className="Big-avatar" src={avatar} alt={"this is avatar image"}/>
                        </span>
                    <h2> {name} {surname}</h2>
                    {
                        (props.user.email === email || isWatched.isWatched) ? null : <button className="Follow" onClick={addUserToWatched}>Obserwuj</button>
                    }
                    {
                        isWatched.isWatched ? <button className="Follow">Obserwujesz</button> : null
                    }
                </div>
                <div className="AboutMe">
                    <h2>O mnie</h2>
                    <hr/>
                    <h5><FaMapMarkerAlt/> {city}, ul. {street}</h5>
                    <h2>Moje Aktywności</h2>
                    <hr/>
                    <div className="Activities">
                        {
                            activities?.map((activity, i) =>{
                                return(<Activity
                                            key={i}
                                            name={activity.name}
                                        />)
                            }
                        )}
                    </div>
                </div>
            </div>
            <div className="Send-message-profile">
                <form action="#" className="Send-message-form">
                    <input
                        className="Send-input"
                        name="contents"
                        type="text"
                        value={message.contents}
                        onChange={handleChange}
                    />
                    <button
                        className="Send-button"
                        type="button"
                        onClick={sendMessage}
                    >
                        Wyślij
                    </button>
                </form>
            </div>
            {
                localStorage.getItem('roles') === 'ROLE_ADMIN,ROLE_USER' ? <button className="Remove-User" onClick={removeUser}>Usuń użytkownika</button> : null
            }
        </div>
    );
}

export default ProfileComponent;