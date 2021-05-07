import React, {Component} from 'react';
import Header from './Header';
import '../styles/Followers.css';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";

class FollowersComponent extends Component{
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
                <main>
                    <section className="Friends">
                        {this.state.followerUsers.map(user =>
                        <ul>
                            <li>
                                <div className="Watched-friend">
                                    <Link to={`/profile/${user.id_user_follower}`}>
                                        <img className="Medium-avatar" src={user.avatar} alt={"this is avatar image"}/>
                                    </Link>
                                    <h3>{user.name} {user.surname}</h3>
                                    <button className="Remove-friend-button" onClick={()=>this.handleAddWatchedUser({key:user.id_user_follower})}>Obserwuj</button>
                                </div>
                            </li>
                        </ul>
                        )}
                    </section>
                </main>
            </div>
        );
    }
}

export default withMedia(withRouter(FollowersComponent));