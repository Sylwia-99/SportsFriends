import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="App-log">
            <div className="Login">
                <div className="Logo-place">
                    <img className="Login-logo" src="logo.png"></img>
                </div>
                <form className="Login-form">
                    <text>Email</text>
                    <input name="email" type="text"></input>
                    <text>Hasło</text>
                    <input name="password" type="text"></input>
                    <button className="Login-button" type="submit">Zaloguj się</button>
                </form>
                <button className="Register-button-login" type="submit">Zarejestruj się</button>
            </div>
        </div>           
    )
}

export default Login;