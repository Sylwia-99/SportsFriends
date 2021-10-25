import React from 'react';
import Conversation from "./Conversation";
import '../../../styles/Left.css';
import {connect} from 'react-redux'
import * as actionCreators from '../../actions/conversation'

const mapStateToProps = (state) => {
    return state;
};

class Left extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {

        this.props.fetchConversations().then(() => {
            //let hubUrl  = this.props.hubUrl;
            let hubUrl  = 'http://localhost:3000/.well-known/mercure';
            const hub = new URL(hubUrl);
            hub.searchParams.append('topic', `/getConversations/${this.props.email}`)
            const eventSource = new EventSource(hub, {
                withCredentials: true,
                headers: {
                    mercureAuthorization: localStorage.getItem('mercureAuthorization')
                }
            });

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('left',data);
                this.props.setLastMessage(data, data.conversation.id);
            }
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
