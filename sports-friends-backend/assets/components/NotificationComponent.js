import React, {Component} from 'react';
import Header from './Header';
import '../styles/Notification.css';
import '../styles/Messages.css';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import {Api} from "../apiHandler/apiHandler";

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
        Api.followers().then( response =>{
            if(response.status === 200){
                this.setState({
                    followerUsers: response.data,
                });
            }
        });
    }

    getWatchedUsers(){
        Api.watchers().then( response =>{
            if(response.status === 200){
                this.setState({
                    watchedUsers: response.data,
                });
            }
        });
    }

    handleAddWatchedUser = (key) => {
        this.state.newWatchedUser=key.key
        Api.newWatchedUser(this.state.newWatchedUser).then( response =>{
            if(response.status === 200){
                console.log('Dodano obserwującego');
            }
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