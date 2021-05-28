import React, {useState} from 'react';
import '../styles/Register.css';
import logo from "../images/logo.png";
import {Api} from "../apiHandler/apiHandler";
import {useForm} from "react-hook-form";

const RegisterForm = () =>{
    const {register, handleSubmit, formState:{ errors }} = useForm();
    const [errorMessage,setErrorMessage] = useState('');

    const onSubmit = formData => {
        Api.register(
            formData.email,
            formData.name,
            formData.surname,
            formData.password,
            formData.confirmPassword,
            formData.postalCode,
            formData.city,
            formData.street
        ).then( response =>{
            if(response.status === 200){
                console.log('Registered new user');
            }
        }).catch( (error) => {
            if(error.response){
                if(error.response){
                    setErrorMessage(error.response.data.detail);
                }
            }
        }).then(()=> {
            if (this.state.values.errorMessage === '') {
                location.href = '/login';
            }
        });
    }


    return (
        <div className="App-log">
            <div className="Register">
                <div className="Logo-place-register">
                    <img className="Logo" src={logo} alt={"this is logo image"}/>
                </div>
                <form className="Register-form" onSubmit={handleSubmit(onSubmit)}>
                    {errorMessage==='' ?
                        null
                        :
                        <p className="Messages">{errorMessage}</p>
                    }
                    <text>Imię</text>
                    <input
                        name="name"
                        type="text"
                        {...register("name",{
                            pattern:{
                                value: /[A-Zaz]/,
                                message: 'Imie może zawierać tylko małe i duże litery'
                            },
                            maxLength:{
                                value:20,
                                message: 'Imię nie może zawierać więcej niż 20 znaków'
                            },
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.name && <span className="error">{errors.name.message}</span>}
                    <text>Nazwisko</text>
                    <input
                        name="surname"
                        type="text"
                        {...register("surname",{
                            pattern:{
                                value: /[A-Zaz]/,
                                message: 'Nazwisko może zawierać tylko małe i duże litery'
                            },
                            maxLength:{
                                value:20,
                                message: 'Nazwisko nie może zawierać więcej niż 20 znaków'
                            },
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.surname && <span className="error">{errors.surname.message}</span>}
                    <text>Email</text>
                    <input
                        name="email"
                        type="text"
                        {...register("email",{
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Email jest nieprawidłowy'
                            },
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.email && <span className="error">{errors.email.message}</span>}
                    <text>Hasło</text>
                    <input
                        name="password"
                        type="password"
                        {...register("password",{
                            pattern:{
                                value: /^((?=.*\d)|(?=.*[a-z])|(?=.*[A-Z])).{8,}$/,
                                message: 'Hasło musi zawierać:Małe i Duże litery, liczby i minimum 8 znaków'
                            },
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.password && <span className="error">{errors.password.message}</span>}
                    <text>Powtórz hasło</text>
                    <input
                        name="confirmPassword"
                        type="password"
                        {...register("confirmPassword",{
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                    <text>Kod pocztowy</text>
                    <input
                        name="postalCode"
                        type="text"
                        {...register("postalCode",{
                            pattern: {
                                value: /^[0-9]{2}[-][0-9]{3}/,
                                message: 'Zły format kodu pocztowego "00-00"'
                            },
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.postalCode && <span className="error">{errors.postalCode.message}</span>}
                    <text>Miasto</text>
                    <input
                        name="city"
                        type="text"
                        {...register("city",{
                            pattern:{
                                value: /[A-Zaz]/,
                                message: 'Miasto może zawierać tylko małe i duże litery'
                            },
                            maxLength:{
                                value:20,
                                message: 'Miasto nie może zawierać więcej niż 20 znaków'
                            },
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.city && <span className="error">{errors.city.message}</span>}
                    <text>Ulica</text>
                    <input
                        name="street"
                        type="text"
                        {...register("street",{
                            pattern:{
                                value: /[A-Zaz]/,
                                message: 'Ulica może zawierać tylko małe i duże litery'
                            },
                            required: "To pole jest wymagane"
                        })}
                    />
                    {errors?.street && <span className="error">{errors.street.message}</span>}
                    <button className="Register-button" type="submit">Zarejestruj się</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;