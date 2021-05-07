import React, {Component} from 'react';
import MessageNav from '../../components/MessageNav';
import {withRouter} from "react-router";
import Header from "../../components/Header";
import '../../styles/ReceiverSendMessage.css';
import axios from "axios";
class SendMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            sentMessages: [],
            recipientName: '',
            recipientSurname: '',
            recipientAvatar: '',
            contents: ''
        }
    }

    componentDidMount() {
        this.getSentMessages();
    }

    getSentMessages(){
        axios.get(`http://localhost:8000/getUserSentMessages`).then(sentMessages => {
            this.setState({ sentMessages: sentMessages.data})
        })
    }

    clickedMessage=(n, m, a, c)=>{
        this.setState({
            recipientName: n,
            recipientSurname: m,
            recipientAvatar: a,
            contents: c
        })
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Messages">
                    <MessageNav/>
                    <div className="Sends">
                        <div className='Receiver-messages'>
                            <h1>Wysłane</h1>
                            <ul className="Rec-messages-list">
                                {
                                    this.state.sentMessages!=null ?
                                        this.state.sentMessages.map(sentMessage =>
                                                <li>
                                                    <div className="One-friend" onClick={()=>this.clickedMessage(sentMessage.name,sentMessage.surname,sentMessage.avatar,sentMessage.contents)}>
                                                        <img className="Medium-avatar" src={sentMessage.avatar}/>
                                                        <h4>{sentMessage.name} {sentMessage.surname}</h4>
                                                    </div>
                                                    <p>{sentMessage.contents}</p>
                                                </li>)
                                        :
                                        <li>
                                            <div className="One-friend">
                                                <h4>Brak wiadomości</h4>
                                            </div>
                                        </li>
                                }
                            </ul>
                        </div>
                        {
                            this.state.recipientName==='' ?
                                null
                                :
                                <div className='Receiver-message'>
                                    <div className="One-friend">
                                        <h4>Do:</h4>
                                        <img className="Medium-avatar" src={this.state.recipientAvatar}/>
                                        <h4>{this.state.recipientName} {this.state.recipientSurname}</h4>
                                    </div>
                                    <p>{this.state.contents}</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SendMessage);