import React, {Component} from 'react';
import Header from './components/Header';
import {withRouter} from "react-router";
import {Link} from 'react-router-dom';
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";

class Watched extends Component{
    constructor(props){
        super(props);
        this.state = {
            watchedUsers: [],
            followerUsers: [],
            removeWatched: ''
        }
    }

    componentDidMount() {
        this.getWatchedUsers();
        this.getFollowerUsers();
    }

    getWatchedUsers(){
        axios.get(`http://localhost:8000/showWatchedUsers`).then(watchedUsers => {
            this.setState({ watchedUsers: watchedUsers.data})
        })
    }

    getFollowerUsers(){
        axios.get(`http://localhost:8000/showFollowerUsers`).then(followerUsers => {
            this.setState({ followerUsers: followerUsers.data})
        })
    }

    handleRemoveWatchedUser = (key) => {
        console.log(key.key)
        console.log(this.state.removeWatched)

        this.state.removeWatched=key.key
        axios.post(`http://localhost:8000/removeWatchedUser/${this.state.removeWatched}`, {
              removeWatched: this.state.removeWatched,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render()
    {
        return (
            <div className="App">
                <Header/>
                <main>
                    <section className="Friends">
                        {this.state.watchedUsers.map(user =>
                        <ul>
                            <li>
                                <div className="Watched-friend" >
                                    <Link to={`/profile/${user.id_user_watcher}`}>
                                        <img className="Medium-avatar" src={user.avatar} alt={"this is avatar image"}/>
                                    </Link>
                                    <h3>{user.name} {user.surname}</h3>
                                    <button className="Remove-friend-button" onClick={()=>this.handleRemoveWatchedUser({key:user.id_user_watcher})}>Usuń</button>
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

export default withMedia(withRouter(Watched));