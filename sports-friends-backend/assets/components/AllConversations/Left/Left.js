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

            let email = this.props.email;

            let hubUrl  = 'http://localhost:3000/.well-known/mercure';
            const hub = new URL(hubUrl, window.origin);
            hub.searchParams.append('topic', `/getConversations/${email}`);

            const eventSource = new EventSource(hub.toString(), {
                withCredentials: true,
            });


            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('data',data);
                this.props.setLastMessage(data, data.conversation.id);
            }
        });
    }

    render() {
        return (
            <div className="left-container">
                <div className="bg-white">
                    <div className="messages-box">
                        <div className="list-group ">
                            {
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
