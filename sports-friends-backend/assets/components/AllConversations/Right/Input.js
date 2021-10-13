import React from 'react'
import {FiSend} from "react-icons/fi";
import '../../../styles/Input.css'
import {connect} from "react-redux";
import * as actionCreators from "../../actions/conversation";

const mapStateToProps = (state) => {
    return state;
};

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(event) {
        event.preventDefault();
        this.props.sendMessage(this.state.content, this.props.id).then(() => {
            this.setState({content: ''})
        });
    }

    handleChange(event) {
        this.setState(
            {content: event.target.value}
        );
    }

    render() {
        return (
            <form action="#" className="input-container">
                <div className="input-group">
                    <input type="text" placeholder="Aa"
                           aria-describedby="button-addon2"
                           onChange={this.handleChange}
                           value={this.state.content}
                           className="input-content"/>
                    <div className="input-group-append">
                        <button
                            className="send-button-chat"
                            id="button-addon2"
                            type="submit"
                            onClick={this.sendMessage}
                        >
                            <FiSend/>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default connect(mapStateToProps, actionCreators)(Input);
