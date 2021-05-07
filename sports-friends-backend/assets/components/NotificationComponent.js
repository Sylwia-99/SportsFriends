import React, {Component} from 'react';
import Header from './Header';
import '../styles/Notification.css';
import '../styles/Messages.css';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";

class NotificationComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            followerUsers: [],
            watchedUsers: [],
            newWatchedUser: ''
        }
    }
    componentDidMount() {
        this.getFollowerUsers();
        this.getWatchedUsers();
    }

    getFollowerUsers(){
        axios.get(`http://localhost:8000/showFollowerUsers`).then(followerUsers => {
            this.setState({ followerUsers: followerUsers.data})
        })
    }

    getWatchedUsers(){
        axios.get(`http://localhost:8000/showWatchedUsers`).then(watchedUsers => {
            this.setState({ watchedUsers: watchedUsers.data})
        })
    }

    handleAddWatchedUser = (key) => {
        this.state.newWatchedUser=key.key
        axios.post(`http://localhost:8000/addNewUserToWatched/${this.state.newWatchedUser}`, {
            newWatchedUser: this.state.newWatchedUser,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Notification">
                    {this.state.followerUsers.map(user =>
                        <div className="One-friend">
                        <img className="Medium-avatar" src={user.avatar} alt={"this is avatar image"}/>
                        <div className="Notification-option">
                            <h3>{user.name} {user.surname} zaczął Cię obserwować</h3>
                            <button className="Accept-button" onClick={()=>this.handleAddWatchedUser({key:user.id_user_follower})}>Obserwuj</button>
                            <button className="Reject-button" type="submit">Odrzuć</button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}

export default withMedia(withRouter(NotificationComponent));