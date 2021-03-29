import React, {Component} from 'react';
import './styles/Login.css';
import {withRouter} from "react-router";
import logo from './images/logo.png';
import { withMedia } from 'react-media-query-hoc';

class Login extends Component{
    render() {
        return (
            <div className="App-log">
                <div className="Login">
                    <div className="Logo-place">
                        <img className="Login-logo" src={logo} alt={"this is logo image"}/>
                    </div>
                    <form className="Login-form">
                        <text>Email</text>
                        <input name="email" type="text"/>
                        <text>Hasło</text>
                        <input name="password" type="text"/>
                        <button className="Login-button" type="submit">Zaloguj się</button>
                    </form>
                    <button className="Register-button-login" type="submit">Zarejestruj się</button>
                </div>
            </div>
        )
    }
}

export default withMedia(withRouter(Login));