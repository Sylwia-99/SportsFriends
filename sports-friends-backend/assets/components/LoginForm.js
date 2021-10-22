import React, {useState} from 'react';
import '../styles/Login.css';
import logo from '../images/logo.png';
import {Link} from "react-router-dom";
import {Api} from "../apiHandler/apiHandler";
import {useForm} from "react-hook-form";

const LoginForm = () =>{
    const {register, handleSubmit, formState:{ errors }} = useForm();
    const [errorMessage,setErrorMessage] = useState('');

    const onSubmit = formData => {
        Api.login(formData.email, formData.password).then( response =>{
                if(response.status === 200){
                    console.log(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('id', response.data.user.id);
                    localStorage.setItem('roles', response.data.roles);
                    localStorage.setItem('mercureAuthorization', response.data.mercureAuthorization);
                    location.href = '/';
                }
        }).catch( (error) =>{
            if(error.response){
                if(error.response){
                    setErrorMessage(error.response.data.detail);
                }
            }
        });
    }

    return (
        <div className="App-log">
            <div className="Login">
                <div className="Logo-place">
                    <img className="Login-logo" src={logo} alt={"this is logo image"}/>
                </div>
                <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
                    {errorMessage==='' ?
                        null
                        :
                        <p className="Messages">{errorMessage}</p>
                    }
                    <text>Email</text>
                    <input
                        name="email"
                        type="text"
                        {...register("email",{
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.email && <span className="error">{errors.email.message}</span>}
                    <text>Hasło</text>
                    <input
                        name="password"
                        type="password"
                        {...register("password",{
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.password && <span className="error">{errors.password.message}</span>}
                    <button className="Login-button" type="submit">Zaloguj się</button>
                </form>
                <Link className="Link-register" to="/Register">
                    <button className="Register-button-login" type="submit">Zarejestruj się</button>
                </Link>
            </div>
        </div>
    )
}

export default LoginForm;