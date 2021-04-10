import React, {Component} from 'react';
import './styles/Register.css';
import {withRouter} from "react-router";
import logo from "./images/logo.png";
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";

class Register extends Component{
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
                street: ''
            }
        }
    }

    state = {
        values:{
            email: '',
            name:'',
            surname: '',
            password: '',
            confirmPassword: '',
            postalCode: '',
            city: '',
            street: ''
        }
    };

    componentDidMount() {
        this.register();
    }

    register(){
        axios.post(`http://localhost:8000/register123`, {
            email: this.state.values.email,
            name:this.state.values.name,
            surname: this.state.values.surname,
            password: this.state.values.password,
            confirmPassword: this.state.values.confirmPassword,
            postalCode: this.state.values.postalCode,
            city: this.state.values.city,
            street: this.state.values.street
        }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    handleChange = (input) => (e) => {
        this.setState({
          values: { ...this.state.values, [input]: e.target.value}
        });
    };

    handleSubmit = (e) => {
        console.log(e);
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
                        <text>Imię</text>
                        <input 
                            name="name" 
                            type="text" 
                            value={values.name}
                            onChange={this.handleChange("name")}
                        />
                        <text>Nazwisko</text>
                        <input 
                            name="surname" 
                            type="text"
                            value={values.surname}
                            onChange={this.handleChange("surname")}
                        />
                        <text>Email</text>
                        <input 
                            name="email" 
                            type="email"
                            value={values.email}
                            onChange={this.handleChange("email")}
                        />
                        <text>Hasło</text>
                        <input 
                            name="password" 
                            type="password"
                            value={values.password}
                            onChange={this.handleChange("password")} 
                        />
                        <text>Powtórz hasło</text>
                        <input 
                            name="confirmPassword" 
                            type="password" 
                            value={values.confirmPassword}
                            onChange={this.handleChange("confirmPassword")}
                        />
                        <text>Kod pocztowy</text>
                        <input 
                            name="postalCode" 
                            type="text"
                            value={values.postalCode}
                            onChange={this.handleChange("postalCode")}
                        />
                        <text>Miasto</text>
                        <input 
                            name="city" 
                            type="text" 
                            value={values.city}
                            onChange={this.handleChange("city")}
                        />
                        <text>Ulica</text>
                        <input 
                            name="street" 
                            type="text" 
                            value={values.street}
                            onChange={this.handleChange("street")}
                        />
                        <button className="Register-button" type="submit">Zarejestruj się</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withMedia(withRouter(Register));