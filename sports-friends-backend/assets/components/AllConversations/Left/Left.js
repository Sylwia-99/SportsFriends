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
            let url = new URL(this.props.hubUrl).toString();
            url.searchParams.append('topic', `/conversations/${this.props.username}`);
            const eventSource = new EventSource(url, {
                withCredentials: true
            });

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
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
