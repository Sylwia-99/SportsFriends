import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/conversation';
import '../../../styles/Right.css';
import Input from "./Input";
import Message from "./Message";
import {useLocation} from "react-router";

const mapStateToProps = (state) => {
    return state;
};

class Right extends React.Component {
    constructor(props){
        super(props);

        this.bodyRef = React.createRef();
        this.state = {
            _conversationIndex: -1,
            eventSource: null,
        }
    }

    scrollDown(){
        this.bodyRef.current.scrollTop = this.bodyRef.current.scrollHeight;
    }

    componentDidUpdate(prevProps) {
        if(this.state._conversationIndex != -1
            && this.props.items[this.state._conversationIndex].messages?.length
            && prevProps.items[this.state._conversationIndex].messages?.length){
                this.scrollDown();
        }
    }

    componentDidMount() {
        const _conversationIndex = this.props.items.findIndex(conversation => {
            return conversation.conversationId.toString() == this.props.match.params.id.toString()
        })
        this.setState({
            _conversationIndex: _conversationIndex
        });
        if (this.props.items[_conversationIndex].messages == undefined) {
            this.props.fetchMessages(this.props.match.params.id)
                .then(() => {
                    this.scrollDown();
                    if (this.state.eventSource === null) {
                        let hubUrl = this.props.hubUrl;
                        const hub = new URL(hubUrl);
                        console.log('props',this.props)
                        hub.searchParams.append('topic', `/getConversations/${this.props.match.params.id}`)
                        this.state.eventSource = new EventSource(hub, {
                            withCredentials: true,
                            headers: {
                                mercureAuthorization: localStorage.getItem('mercureAuthorization')
                            }
                        });

                        this.state.eventSource.onmessage = (event) => {
                            const data = JSON.parse(event.data);
                            if(data.user.email != this.props.email){
                                this.props.addMessage(data, data.conversation.id);
                            }
                        }
                    }

                });
        } else {
            this.scrollDown();
        }
    }

    componentWillUnmount() {
        if (this.state.eventSource instanceof EventSource) {
            this.state.eventSource.close();
            this.setState({
                eventSource: null
            })
        }
    }

    render() {
        return (
            <div className="right-container">
                <div className="right-content" ref={this.bodyRef}>
                    {
                        this.state._conversationIndex !== -1
                        && this.props.items != undefined
                        && this.props.items[this.state._conversationIndex].messages != undefined
                            ? this.props.items[this.state._conversationIndex].messages
                                ?.map((message, index) => {
                                    return(
                                        <Message message={message} key={index} avatar={this.props.location.state.avatar}/>
                                    )
                                }) : ''
                    }
                </div>

                <Input id={this.props.match.params.id}/>
            </div>
        );
    }
}
export default connect(mapStateToProps, actionCreators)(Right);
