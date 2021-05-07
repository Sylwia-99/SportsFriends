import React, {Component} from 'react';
import WatchedComponent from '../components/WatchedComponent';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';

class Watched extends Component{
    render()
    {
        return (
                <WatchedComponent/>
        );
    }
}

export default withMedia(withRouter(Watched));