import React, {Component} from 'react';
import Header from './components/Header';
import './styles/YourProfile.css';
import {BiFootball} from 'react-icons/bi';
import {FaRunning, FaMapMarkerAlt, FaSwimmer} from 'react-icons/fa';
import {MdDirectionsBike} from 'react-icons/md';
import {CgGym} from 'react-icons/cg';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentUserId: '',
            currentUserEmail: '',
            currentUserIdRole: '',
            email: '',
            name: '',
            surname: '',
            city: '',
            street: '',
            avatar: '',
            activities: [],
            id: this.props.match.params.profileId,
            contents: ''
        }
    }

    componentDidMount() {
        this.getCurrentUser();
        this.getUser();
        this.getUserActivities();
    }

    getCurrentUser(){
        axios.get('http://localhost:8000/showCurrentUser').then(user => {
            this.setState({
                currentUserId: user.data[0].id,
                currentUserEmail: user.data[0].email,
                currentUserIdRole: user.data[0].id_role
            });
            console.log(user);
        });
    }

    getUser(){
        axios.get(`http://localhost:8000/user/${this.state.id}`).then(user => {
            this.setState({
                email: user.data[0].email,
                name: user.data[0].name,
                surname: user.data[0].surname,
                city: user.data[0].city,
                street: user.data[0].street,
                avatar: user.data[0].avatar,
            });
        });
    }

    getUserActivities(){
        axios.get(`http://localhost:8000/userActivities/${this.state.id}`).then(activities => {
            this.setState({
                activities: activities.data
            });
        });
    }

    addUserToWatched = (e) =>{
        console.log(e);
        e.preventDefault();
        axios.post(`http://localhost:8000/addNewUserToWatched/${this.state.id}`, {
                newWatchedUser: this.state.id,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleChange = (e) => {
        this.setState({
            contents: e.target.value
        });
    };

    sendMessage = (e) => {
        console.log(e);
        e.preventDefault();
        axios.post(`http://localhost:8000/createMessage`, {
            idUserSender: this.state.currentUserId.toLocaleString(),
            idUserRecipient: this.state.id,
            contents: this.state.contents,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    removeUser = (e) =>{
        console.log(e);
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/users/${this.state.id}`
        ).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Your-information">
                    <div className="Profile">
                            <img className="Big-avatar" src={this.state.avatar} alt={"this is avatar image"}/>
                            <h2>{this.state.name} {this.state.surname}</h2>
                        {
                            this.state.currentUserEmail === this.state.email ? null : <button className="Follow" onClick={this.addUserToWatched}>Obserwuj</button>
                        }
                    </div>
                    <div className="AboutMe">
                        <h2>O mnie</h2>
                        <hr/>
                        <h5><FaMapMarkerAlt/> {this.state.city}, ul. {this.state.street}</h5>
                        <h2>Moje Aktywności</h2>
                        <hr/>
                        <div className="Activities">
                            {this.state.activities.map(activity =>
                            <div>
                                    {
                                        activity.name==="Bieganie" ? <h4><FaRunning/> Bieganie</h4> : null
                                    }
                                    {
                                        activity.name==="Rower" ? <h4><MdDirectionsBike/> Rower</h4> : null
                                    }
                                    {
                                        activity.name==="Pływanie" ? <h4><FaSwimmer/> Pływanie</h4> : null
                                    }
                                    {
                                        activity.name==="Piłka nożna" ? <h4><BiFootball/> Piłka nożna</h4> : null
                                    }
                                    {
                                        activity.name==="Siłownia" ? <h4><CgGym/> Siłownia</h4> : null
                                    }
                                    {
                                        activity.name===null ? <h4> Brak aktywności</h4> : null
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="Send-message-profile">
                    <form className="Send-message-form" onSubmit={this.sendMessage}>
                        <input
                            className="Send-input"
                            name="contents"
                            type="text"
                            value={this.state.contents}
                            onChange={this.handleChange}
                        />
                        <button className="Send-button" type="submit">Wyślij</button>
                    </form>
                </div>
                {
                    this.state.currentUserIdRole === 1 ? <button className="Remove-User" onClick={this.removeUser}>Usuń użytkownika</button> : null
                }
            </div>
        );
    }
}

export default withMedia(withRouter(Profile));