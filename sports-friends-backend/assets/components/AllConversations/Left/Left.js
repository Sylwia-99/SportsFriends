import React from 'react';
import Conversation from "./Conversation";
import '../../../styles/Left.css';
import {connect} from 'react-redux'
import * as actionCreators from '../../actions/conversation'
import { EventSourcePolyfill } from 'event-source-polyfill';

const mapStateToProps = (state) => {
    return state;
};

class Left extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {

        this.props.fetchConversations().then(() => {
            //let email = this.props.email;
            //let hubUrl  = 'http://localhost:3000/.well-known/mercure';
            //hub.searchParams.append('topic', `/getConversations/${email}`)

            let hubUrl  = this.props.hubUrl;
            const hub = new URL(hubUrl);
            hub.searchParams.append('topic', `/getConversations/${this.props.email}`)
            //hub.searchParams.append('subscriber', `/getConversations/${this.props.email}`)
            const eventSource = new EventSource(hub, {
                withCredentials: true,
                headers: {
                    mercureAuthorization: localStorage.getItem('mercureAuthorization')
                }
            });

            console.log(eventSource);

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('left',data);
                this.props.setLastMessage(data, data.conversation.id);
            }

            /*let hubUrl  = 'http://localhost:3000/.well-known/mercure';
            const hub = new URL(hubUrl, window.origin);
            hub.searchParams.append('topic', `/getConversations/${email}`);

            const eventSource = new EventSource(hub.toString(),{
                headers:{
                    'mercureAuthorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.7O7cu4UGyIvZ_RnrEdKm4BMZUZcb5uNOyGc1HqALNmQ'
                },
            });

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('data',data);
                this.props.setLastMessage(data, data.conversation.id);
            }*/

        });
    }

    render() {
        return (
            <div className="left-container">
                <div className="bg-white">
                    <div className="messages-box">
                        <div className="list-group">
                            {
                                this.props.items.length === 0 ?
                                    <div className="no-conversations-info">
                                        <h2>Nie masz żadnych konwersacji.</h2>
                                        <h3>By rozpocząć chat z danym użytkownikiem wejdź na jego profil i wyślij do niego wiadomość</h3>
                                    </div>
                                    :
                                    this.props.items
                                        .sort((a,b) =>{
                                            return a.createdAt < b.createdAt;
                                        })
                                        .map((conversation, index) => {
                                            return (
                                                <Conversation conversation={conversation} key={index}/>
                                            )
                                        })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, actionCreators)(Left);
