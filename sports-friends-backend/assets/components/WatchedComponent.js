import React, {Component} from 'react';
import Header from './Header';
import {withRouter} from "react-router";
import {Link} from 'react-router-dom';
import { withMedia } from 'react-media-query-hoc';
import {Api} from "../apiHandler/apiHandler";

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
        Api.watchers().then( response =>{
            if(response.status === 200){
                this.setState({
                    watchedUsers: response.data,
                });
            }
        });
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

    handleRemoveWatchedUser = (key) => {
        this.state.removeWatched=key.key
        Api.removeWatchedUser(this.state.removeWatched).then( response =>{
            if(response.status === 200){
                console.log('Usunięto obserwowanego użytkownika');
            }
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
                        <ul key={user.id}>
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