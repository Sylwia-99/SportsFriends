import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/conversation';
import '../../../styles/Right.css';
import Input from "./Input";
import Message from "./Message";

const mapStateToProps = (state) => {
    return state;
};

class Right extends React.Component {
    constructor(props){
        super(props);

        this.bodyRef = React.createRef();
        this.state = {
            _conversationIndex: -1
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
        this.props.fetchMessages(this.props.match.params.id)
            .then(() =>{
                this.scrollDown();
            });
    }

    componentWillUnmount() {
        console.log('unmount');
    }

    render() {
        return (
            <div className="right-container">
                <div className="right-content" ref={this.bodyRef}>
                    {
                        this.state._conversationIndex !== -1 ?
                        this.props.items[this.state._conversationIndex].messages
                            ?.map((message, index) => {
                                return(
                                    <Message message={message} key={index} />
                            )
                            })
                            : ''
                    }
                </div>

                <Input id={this.props.match.params.id}/>
            </div>
        );
    }
}
export default connect(mapStateToProps, actionCreators)(Right);
