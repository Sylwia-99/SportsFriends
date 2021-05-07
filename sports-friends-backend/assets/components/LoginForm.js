import React, {Component} from 'react';
import '../styles/Login.css';
import {withRouter} from "react-router";
import logo from '../images/logo.png';
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";
import {Link} from "react-router-dom";

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            values:{
                email: '',
                password: '',
                errorMessage: ''
            }
        }
    }

    handleChange = (input) => (e) => {
        this.setState({
            values: { ...this.state.values, [input]: e.target.value}
        });
    };

    handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();

        this.setState({values:{
            errorMessage: ''
        }});
        axios.post(`http://localhost:8000/loginUser`, {
            email: this.state.values.email,
            password: this.state.values.password,
        }).then(function (response) {
            console.log(response);
        }).catch( (error) =>{
            if(error.response){
                console.log(error.response.data.detail);
                this.setState({values:{
                        errorMessage: error.response.data.detail,
                        email: '',
                        password: ''
                    }});
            }
        }).then(()=>{
            if(this.state.values.errorMessage===''){
                location.href = '/';
            }
        });
    }

    render() {
        const {values} = this.state;
        return (
            <div className="App-log">
                <div className="Login">
                    <div className="Logo-place">
                        <img className="Login-logo" src={logo} alt={"this is logo image"}/>
                    </div>
                    <form className="Login-form" onSubmit={this.handleSubmit}>
                        {values.errorMessage==='' ?
                            null
                            :
                            <p className="Messages">{values.errorMessage}</p>
                        }
                        <text>Email</text>
                        <input
                            name="email"
                            type="text"
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
                        <button className="Login-button" type="submit">Zaloguj się</button>
                    </form>
                    <Link className="Link-register" to="/Register">
                        <button className="Register-button-login" type="submit">Zarejestruj się</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default withMedia(withRouter(LoginForm));