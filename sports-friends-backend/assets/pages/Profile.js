import React, {Component} from 'react';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import ProfileComponent from "../components/ProfileComponent";

class Profile extends Component{
    render() {
        return (
            <>
                <ProfileComponent/>
            </>
        );
    }
}

export default withMedia(withRouter(Profile));