import React, {Component} from 'react';
import './styles/Register.css';
import {withRouter} from "react-router";
import logo from "./images/logo.png";
import { withMedia } from 'react-media-query-hoc';

class Register extends Component{
    render() {
        return (
            <div className="App-log">
                <div className="Register">
                    <div className="Logo-place-register">
                        <img className="Logo" src={logo} alt={"this is logo image"}/>
                    </div>
                    <form className="Register-form">
                        <text>Imię</text>
                        <input name="name" type="text"/>
                        <text>Nazwisko</text>
                        <input name="surname" type="text"/>
                        <text>Email</text>
                        <input name="email" type="text"/>
                        <text>Hasło</text>
                        <input name="password" type="text"/>
                        <text>Powtórz hasło</text>
                        <input name="confirmPassword" type="text"/>
                        <text>Miasto</text>
                        <input name="city" type="text"/>
                        <text>Ulica</text>
                        <input name="street" type="text"/>
                        <button className="Register-button" type="submit">Zarejestruj się</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withMedia(withRouter(Register));