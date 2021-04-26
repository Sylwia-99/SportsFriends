import React, {Component} from 'react';
import MessageNav from './components/MessageNav';
import {withRouter} from "react-router";
import Header from "./components/Header";
import './styles/NewMessage.css';
import axios from "axios";
import {Link} from "react-router-dom";

class NewMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentUserId: '',
            userRecipientId: '',
            watchedUsers: [],
            contents: ''
        }
    }

    componentDidMount() {
        this.getCurrentUser();
        this.getWatchedUsers();
    }

    getWatchedUsers(){
        axios.get(`http://localhost:8000/showWatchedUsers`).then(watchedUsers => {
            this.setState({ watchedUsers: watchedUsers.data})
        })
    }

    getCurrentUser(){
        axios.get('http://localhost:8000/showCurrentUser').then(user => {
            this.setState({
                currentUserId: user.data[0].id,
            });
            console.log(user);
        });
    }

    handleChange = (input) => (e) => {
        this.setState({
            [input]: e.target.value
        });
    };

    sendMessage = (e) => {
        console.log(e);
        e.preventDefault();
        axios.post(`http://localhost:8000/createMessage`, {
            idUserSender: this.state.currentUserId.toLocaleString(),
            idUserRecipient: this.state.userRecipientId,
            contents: this.state.contents,
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
                <div className="New-Message">
                    <MessageNav/>
                    <form className="Message-form" onSubmit={this.sendMessage}>
                        <select
                            className="Receiver"
                            value={this.state.userRecipientId}
                            onChange={this.handleChange("userRecipientId")}
                        >
                            {this.state.watchedUsers.map((watchedUser) =>
                                <option
                                    value={watchedUser.id_user_watcher}
                                >
                                    {watchedUser.name} {watchedUser.surname}
                                </option>
                            )}
                        </select>
                        <input
                            className="Message-input"
                            placeholder="Wiadomość"
                            name="contents"
                            type="text"
                            value={this.state.contents}
                            onChange={this.handleChange("contents")}
                        />
                        <button className="Send" type="submit"> Wyślij wiadomość</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(NewMessage);