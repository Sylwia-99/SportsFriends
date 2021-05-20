import React, {Component} from 'react';
import Header from './Header';
import '../styles/Followers.css';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import {Api} from "../apiHandler/apiHandler";

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
                <main>
                    <section className="Friends">
                        {this.state.followerUsers.map(user =>
                        <ul key={user.id}>
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