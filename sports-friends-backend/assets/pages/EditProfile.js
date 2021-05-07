import React, {Component} from 'react';
import EditProfileComponent from '../components/EditProfileComponent';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';

class EditProfile extends Component{
    render() {
        return (
        <>
            <EditProfileComponent/>
        </>
        )
    }
}

export default withMedia(withRouter(EditProfile));