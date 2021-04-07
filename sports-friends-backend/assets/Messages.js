import React, {Component} from 'react';
import Header from './components/Header';
import MessageNav from './components/MessageNav';
import './styles/Messages.css';
import {withRouter} from 'react-router';
import { withMedia } from 'react-media-query-hoc';
import ReceiverMessage from "./ReceiverMessage";

class Messages extends Component{
    render() {
        return (
            <div className="App">
                <ReceiverMessage/>
            </div>
        )
    }
}
export default withMedia(withRouter(Messages));