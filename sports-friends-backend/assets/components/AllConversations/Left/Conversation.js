import React from 'react';
import {NavLink} from "react-router-dom";
import '../../../styles/Conversation.css';
import {Api} from "../../../apiHandler/apiHandler";

class Conversation extends React.Component {
    state = {
        avatar: null,
        id: null,
    }

    componentDidMount() {
        this.getUser(this.props.conversation.email);
    }

    getUser(email){
        Api.userFromEmail(email).then( response =>{
            if(response.status === 200){
                import(`../../../../src/uploads/${response.data[0].avatar}`)
                    .then(({default: url}) =>{
                        this.setState({avatar : url});
                    });
                this.setState({id : response.data[0].id});
            }
        });
    }

    render() {
        return (
            <NavLink to={`/chat/${this.state.id}/conversation/` + this.props.conversation.conversationId }>
                <div className="conversation-container">
                    <div className="one-friend">
                        <img className="medium-avatar" src={this.state.avatar}/>
                    </div>
                    <div className="conversation-content">
                        <div className="conversation-data-content">
                            <h6 className="user-name">{this.props.conversation.email}</h6>
                            <small
                                className="date">{new Date(this.props.conversation.createdAt).toLocaleDateString()}</small>
                        </div>
                        <p className="last-message-content">{this.props.conversation.content}</p>
                    </div>
                </div>
            </NavLink>
        );
    }
}

export default Conversation;