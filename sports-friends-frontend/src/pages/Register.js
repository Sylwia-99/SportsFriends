import React from 'react';
import './Register.css';

function Register() {
    return (
        <div className="App-log">
            <div className="Register">
                <div className="Logo-place-register">
                    <img src="logo.png"></img>
                </div>
                <form className="Register-form">
                    <text>Imię</text>
                    <input name="name" type="text"></input>
                    <text>Nazwisko</text>
                    <input name="surname" type="text"></input>
                    <text>Email</text>
                    <input name="email" type="text"></input>
                    <text>Hasło</text>
                    <input name="password" type="text"></input>
                    <text>Powtórz hasło</text>
                    <input name="confirmPassword" type="text"></input>
                    <text>Miasto</text>
                    <input name="city" type="text"></input>
                    <text>Ulica</text>
                    <input name="street" type="text"></input>
                    <button className="Register-button" type="submit">Zarejestruj się</button>
                </form>
            </div>
        </div>
    )
}

export default Register;