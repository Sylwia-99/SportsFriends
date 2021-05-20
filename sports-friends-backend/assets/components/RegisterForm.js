import React, {Component} from 'react';
import '../styles/Register.css';
import {withRouter} from "react-router";
import logo from "../images/logo.png";
import { withMedia } from 'react-media-query-hoc';
import {Api} from "../apiHandler/apiHandler";

class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            values:{
                email: '',
                name:'',
                surname: '',
                password: '',
                confirmPassword: '',
                postalCode: '',
                city: '',
                street: '',
                errorMessage: ''
            },
            errors:{}
        }
    }

    handleChange = (input) => (e) => {
        let values = this.state.values;
        let errors = {};

        //Name
        if (values["name"] !== "") {
            if (!values["name"].match(/^[a-zA-Z]+$/)) {
                errors["name"] = "Imie może zawierać tylko litery";
            }
        }

        //Surname
        if (values["surname"] !== "") {
            if (!values["surname"].match(/^[a-zA-Z]+$/)) {
                errors["surname"] = "Nazwisko może zawierać tylko litery";
            }
        }

        //Email
        if (values["email"] !== "") {
            let lastAtPos = values["email"].lastIndexOf('@');
            let lastDotPos = values["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && values["email"].indexOf('@@') == -1 && lastDotPos > 2 && (values["email"].length - lastDotPos) > 2)) {
                errors["email"] = "Email jest nieprawidłowy";
            }
        }

        //Password
        if (values["password"] !== "") {
            if (!values["password"].match(/^((?=.*\d)|(?=.*[a-z])|(?=.*[A-Z])).{8,}$/)) {
                errors["password"] = "Hasło musi zawierać:Małe i Duże litery, liczby i minimum 8 znaków";
            }
        }

        //PostalCode
        if (values["postalCode"] !== "") {
            if (!values["postalCode"].match(/^[0-9]{2}[-][0-9]{3}/)) {
                errors["postalCode"] = "Zły format kodu pocztowego 00-000";
            }
        }

        //City
        if (values["city"] !== "") {
            if (!values["city"].match(/^((?=.*[a-z])|(?=.*[A-Z])).{3,}$/)) {
                errors["city"] = "Miasto może zawierać tylko litery i składać się z co najmniej 3 znaków";
            }
        }

        //Street
        if (values["street"] !== "") {
            if (!values["street"].match(/^[a-zA-Z]+$/)) {
                errors["street"] = "Ulica może zawierać tylko litery";
            }
        }

        this.setState({
            values: { ...this.state.values, [input]: e.target.value},
            errors: errors
        });
    };

    handleValidation() {
        let values = this.state.values;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!values["name"]) {
            formIsValid = false;
            errors["name"] = "Podaj imię";
        }

        //Surname
        if (!values["surname"]) {
            formIsValid = false;
            errors["surname"] = "Podaj nazwisko";
        }

        //Email
        if (!values["email"]) {
            formIsValid = false;
            errors["email"] = "Podaj Email";
        }

        //Password
        if (!values["password"]) {
            formIsValid = false;
            errors["password"] = "Wpisz Hasło";
        }

        if (!values["confirmPassword"]) {
            formIsValid = false;
            errors["confirmPassword"] = "Powtórz Hasło";
        }

        if (values["password"] !== "" && values["confirmPassword"] !== "") {

            if (values["password"] !== values["confirmPassword"]) {
                errors["password"] = "Hasła się różnią";
            }
        }

        //Postal-code
        if (!values["postalCode"]) {
            formIsValid = false;
            errors["postalCode"] = "Podaj kod pocztowy";
        }

        //City
        if (!values["city"]) {
            formIsValid = false;
            errors["city"] = "Podaj miasto";
        }

        //Street
        if (!values["street"]) {
            formIsValid = false;
            errors["street"] = "Podaj ulicę";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({values:{
                errorMessage: '',
                email: this.state.values.email,
                name:this.state.values.name,
                surname: this.state.values.surname,
                password: this.state.values.password,
                confirmPassword: this.state.values.confirmPassword,
                postalCode: this.state.values.postalCode,
                city: this.state.values.city,
                street: this.state.values.street
            }});
        if(this.handleValidation()){
            Api.register(
                this.state.values.email,
                this.state.values.name,
                this.state.values.surname,
                this.state.values.password,
                this.state.values.confirmPassword,
                this.state.values.postalCode,
                this.state.values.city,
                this.state.values.street
            ).then( response =>{
                if(response.status === 200){
                    console.log('Registered new user');
                }
            }).catch( (error) => {
                if(error.response){
                    this.setState({values:{
                            errorMessage: error.response.data.detail,
                            email: this.state.values.email,
                            name:this.state.values.name,
                            surname: this.state.values.surname,
                            password: this.state.values.password,
                            confirmPassword: this.state.values.confirmPassword,
                            postalCode: this.state.values.postalCode,
                            city: this.state.values.city,
                            street: this.state.values.street
                        }});
                }
            }).then(()=> {
                if (this.state.values.errorMessage === '') {
                    location.href = '/login';
                }
            });
        }
    }

    render() {
        const {values} = this.state;
        return (
            <div className="App-log">
                <div className="Register">
                    <div className="Logo-place-register">
                        <img className="Logo" src={logo} alt={"this is logo image"}/>
                    </div>
                    <form className="Register-form" onSubmit={this.handleSubmit}>
                        {values.errorMessage==='' ?
                        null
                        :
                        <p className="Messages">{values.errorMessage}</p>
                        }
                        <text>Imię</text>
                        <input
                            name="name" 
                            type="text"
                            size="30"
                            value={values.name}
                            onChange={this.handleChange("name")}
                        />
                        <span className="error">{this.state.errors["name"]}</span>
                        <text>Nazwisko</text>
                        <input 
                            name="surname" 
                            type="text"
                            value={values.surname}
                            onChange={this.handleChange("surname")}
                        />
                        <span className="error">{this.state.errors["surname"]}</span>
                        <text>Email</text>
                        <input 
                            name="email" 
                            type="text"
                            value={values.email}
                            onChange={this.handleChange("email")}
                        />
                        <span className="error">{this.state.errors["email"]}</span>
                        <text>Hasło</text>
                        <input 
                            name="password" 
                            type="password"
                            value={values.password}
                            onChange={this.handleChange("password")} 
                        />
                        <span className="error">{this.state.errors["password"]}</span>
                        <text>Powtórz hasło</text>
                        <input 
                            name="confirmPassword" 
                            type="password" 
                            value={values.confirmPassword}
                            onChange={this.handleChange("confirmPassword")}
                        />
                        <span className="error">{this.state.errors["confirmPassword"]}</span>
                        <text>Kod pocztowy</text>
                        <input 
                            name="postalCode" 
                            type="text"
                            value={values.postalCode}
                            onChange={this.handleChange("postalCode")}
                        />
                        <span className="error">{this.state.errors["postalCode"]}</span>
                        <text>Miasto</text>
                        <input 
                            name="city" 
                            type="text" 
                            value={values.city}
                            onChange={this.handleChange("city")}
                        />
                        <span className="error">{this.state.errors["city"]}</span>
                        <text>Ulica</text>
                        <input 
                            name="street" 
                            type="text" 
                            value={values.street}
                            onChange={this.handleChange("street")}
                        />
                        <span className="error">{this.state.errors["street"]}</span>
                        <button className="Register-button" type="submit">Zarejestruj się</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withMedia(withRouter(RegisterForm));