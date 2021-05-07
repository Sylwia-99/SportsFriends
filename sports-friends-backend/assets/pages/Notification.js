import React, {Component} from 'react';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import NotificationComponent from "../components/NotificationComponent";
class Notification extends Component{
    render() {
        return (
            <>
              <NotificationComponent/>
            </>
        )
    }
}

export default withMedia(withRouter(Notification));