import React, {Component} from 'react';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import FollowersComponent from "../components/FollowersComponent";

class Followers extends Component{
    render() {
        return (
            <>
                <FollowersComponent/>
            </>
        );
    }
}

export default withMedia(withRouter(Followers));