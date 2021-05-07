import React, {Component} from 'react';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import LoginForm from "../components/LoginForm";

class Login extends Component{
    render() {
        return (
            <>
               <LoginForm/>
            </>
        )
    }
}

export default withMedia(withRouter(Login));