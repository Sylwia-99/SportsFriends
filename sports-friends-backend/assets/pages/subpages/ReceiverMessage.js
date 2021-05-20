import React, {Component} from 'react';
import MessageNav from '../../components/MessageNav';
import {withRouter} from "react-router";
import Header from "../../components/Header";
import '../../styles/ReceiverSendMessage.css';
import {Api} from "../../apiHandler/apiHandler";

class ReceiverMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            receivedMessages: [],
            senderName: '',
            senderSurname: '',
            senderAvatar: '',
            contents: ''
        }
    }

    componentDidMount() {
        this.getReceivedMessages();
    }

    getReceivedMessages(){
        Api.receivedMessages().then( response =>{
            if(response.status === 200){
                this.setState({
                    receivedMessages: response.data
                });
            }
        });
    }

    clickedMessage=(n, m, a, c)=>{
        this.setState({
            senderName: n,
            senderSurname: m,
            senderAvatar: a,
            contents: c
        })
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Messages">
                    <MessageNav/>
                    <div className="Receivers">
                        <div className='Receiver-messages'>
                            <h1>Odebrane</h1>
                            <ul className="Rec-messages-list">
                                {
                                    this.state.receivedMessages.contents!=null?
                                        this.state.receivedMessages.map(receivedMessage =>
                                        <li>
                                            <div className="One-friend" onClick={()=>this.clickedMessage(receivedMessage.name,receivedMessage.surname,receivedMessage.avatar,receivedMessage.contents)}>
                                                <img className="Medium-avatar" src={receivedMessage.avatar} alt="this is avatar"/>
                                                <h4>{receivedMessage.name} {receivedMessage.surname}</h4>
                                            </div>
                                            <p>{receivedMessage.contents}</p>
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
                            this.state.senderName==='' ?
                                null
                                :
                                <div className='Receiver-message'>
                                    <div className="One-friend">
                                        <h4>Od:</h4>
                                        <img className="Medium-avatar" src={this.state.senderAvatar} alt="this is avatar"/>
                                        <h4>{this.state.senderName} {this.state.senderSurname}</h4>
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

export default withRouter(ReceiverMessage);