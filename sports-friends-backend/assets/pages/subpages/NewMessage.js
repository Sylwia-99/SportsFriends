import React, {Component} from 'react';
import MessageNav from '../../components/MessageNav';
import {withRouter} from "react-router";
import Header from "../../components/Header";
import '../../styles/NewMessage.css';
import {Api} from "../../apiHandler/apiHandler";

class NewMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            userRecipientId: '',
            watchedUsers: [],
            contents: ''
        }
    }

    componentDidMount() {
        this.getWatchedUsers();
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

    handleChange = (input) => (e) => {
        this.setState({
            [input]: e.target.value
        });
    };

    sendMessage = (e) => {
        e.preventDefault();
        Api.newMessage(this.state.userRecipientId, this.state.contents).then( response =>{
            if(response.status === 200){
                console.log('Wysłano wiadomość');
            }
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
                            onClick={this.handleChange("userRecipientId")}
                        >
                            {this.state.watchedUsers.map((watchedUser) =>
                                <option key={watchedUser.id}
                                    value={watchedUser.id_user_watcher}
                                >
                                    {watchedUser.name} {watchedUser.surname}
                                </option>
                            )}
                        </select>
                        <textarea
                            className="Message-input"
                            placeholder="Wiadomość"
                            name="contents"
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