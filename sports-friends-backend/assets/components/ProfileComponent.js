import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../styles/YourProfile.css';
import { FaMapMarkerAlt} from 'react-icons/fa';
import {Api} from "../apiHandler/apiHandler";
import Activity from "./Activity";
import {addMessage, setLastMessage} from "./actions/conversation";

const ProfileComponent = (props) =>{
    const [currentUser, setCurrentUser] = useState({
        currentUserId: localStorage.getItem('id'),
        currentUserEmail: '',
        currentUserRole: localStorage.getItem('roles')
    });

    const [user, setUser] =useState({
        email: '',
        name: '',
        surname: '',
        city: '',
        street: '',
    })

    const [avatar, setAvatar] = useState();

    const [activities, setActivities] = useState ( []);

    const [message, setMessage] = useState({
        contents: ''
    })

    const [conversation, setConversation] = useState({
        id: null
    })

    const [isWatched, setIsWatched] = useState({
        isWatched: false
    })

    useEffect(() =>{
        getCurrentUser();
        getUser(props.id);
        getUserActivities(props.id);
        getWatchedUsers();
        console.log(props.id);
    }, [props.id]);

    function getCurrentUser(){
        Api.currentUser().then( response =>{
            if(response.status === 200){
                setCurrentUser({
                    currentUserEmail: response.data[0].email,
                    currentUserId: localStorage.getItem('id'),
                    currentUserRole: localStorage.getItem('roles')
                });
            }
        })
    }

    function getUser(id){
        Api.user(id).then( response =>{
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
                            setAvatar(url);
                        })
            }
        });
    }

    function getUserActivities(id){
        Api.userActivities(id).then( response =>{
            if(response.status === 200) {
                setActivities( response.data);
            }
        });
    }

    function getWatchedUsers(){
        Api.watchers().then( response =>{
            if(response.status === 200){
                const found = response.data.find(element => element.id_user_watcher === props.id);
                console.log(found);
                if(found){
                    setIsWatched({
                        isWatched: true
                    });
                }
                console.log(found);
            }

        });
    }

    function addUserToWatched (){
        Api.newWatchedUser(props.id).then( response =>{
            if(response.status === 200){
                console.log('Dodano obserwującego');
                setIsWatched({
                    isWatched: true
                });
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
            setConversation({id: response.data.id})
            console.log(response.data.id)
            Api.sendMessage(message.contents, conversation.id).then(({data}) => {
                //dispatch(setLastMessage(data, conversation.id));
                //return dispatch(addMessage(data, conversation))
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
            <Header/>
            <div className="Your-information">
                <div className="Profile">
                        <span className="big">
                            <img className="Big-avatar" src={avatar} alt={"this is avatar image"}/>
                        </span>
                    <h2>{user.name} {user.surname}</h2>
                    {
                        (currentUser.currentUserEmail === user.email || isWatched.isWatched) ? null : <button className="Follow" onClick={addUserToWatched}>Obserwuj</button>
                    }
                    {
                        isWatched.isWatched ? <button className="Follow">Obserwujesz</button> : null
                    }
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
                currentUser.currentUserRole === 'ROLE_ADMIN,ROLE_USER' ? <button className="Remove-User" onClick={removeUser}>Usuń użytkownika</button> : null
            }
        </div>
    );
}

export default ProfileComponent;