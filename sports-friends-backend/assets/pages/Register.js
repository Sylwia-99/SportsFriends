import React, {Component} from 'react';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import RegisterForm from "../components/RegisterForm";

class Register extends Component{
    render() {
        return (
            <>
               <RegisterForm/>
            </>
        )
    }
}

export default withMedia(withRouter(Register));