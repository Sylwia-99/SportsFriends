import React, {Component} from 'react';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import YourProfileComponent from "../components/YourProfileComponent";
class YourProfile extends Component{
    render() {
        return (
            <>
                <YourProfileComponent/>
            </>
        );
    }
}
export default withMedia(withRouter(YourProfile));