import React, {Component} from 'react';
import Header from './Header';
import '../styles/EditProfile.css';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";

class EditProfileComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            values:{
                avatar: '',
                name: '',
                surname: '',
                removeActivity: '',
                addActivity: '',
                activities: [],
                errorMessage: ''
            },
            changePassword:{
                currentPassword: '',
                password: '',
                confirmedPassword: '',
                errorMessage: ''
            },
            changeNameSurname:{
                name: '',
                surname: '',
                errorMessage: ''
            },
            errors:{}
        }
    }

    handleChange = (input) => (e) => {
        this.setState({
            values: { ...this.state.values, [input]: e.target.value},
        });
    }

    handleValidationNameSurname() {
        let changeNameSurname = this.state.changeNameSurname;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!changeNameSurname["name"]) {
            formIsValid = false;
            errors["name"] = "Podaj imię";
        }

        //Surname
        if (!changeNameSurname["surname"]) {
            formIsValid = false;
            errors["surname"] = "Podaj nazwisko";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleValidationPassword() {
        let changePassword = this.state.changePassword;
        let errors = {};
        let formIsValid = true;

        //Password
        if (!changePassword["currentPassword"]) {
            formIsValid = false;
            errors["currentPassword"] = "Wpisz Aktualne Hasło";
        }

        if (!changePassword["password"]) {
            formIsValid = false;
            errors["password"] = "Wpisz Hasło";
        }

        if (!changePassword["confirmedPassword"]) {
            formIsValid = false;
            errors["confirmedPassword"] = "Powtórz Hasło";
        }

        if (changePassword["password"] !== "" && changePassword["confirmedPassword"] !== "") {

            if (changePassword["password"] !== changePassword["confirmedPassword"]) {
                errors["password"] = "Hasła się różnią";
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleChangePasswordValue = (input) => (e) => {
        let changePassword = this.state.changePassword;
        let errors = {};

        //Password
        if (changePassword["password"] !== "") {
            if (!changePassword["password"].match(/^((?=.*\d)|(?=.*[a-z])|(?=.*[A-Z])).{8,}$/)) {
                errors["password"] = "Hasło musi zawierać:Małe i Duże litery, liczby i minimum 8 znaków";
            }
        }

        this.setState({
            changePassword: { ...this.state.changePassword, [input]: e.target.value},
            errors: errors
        });
    };

    handleChangeNameSurnameValue = (input) => (e) => {
        let changeNameSurname = this.state.changeNameSurname;
        let errors = {};

        //Name
        if (changeNameSurname["name"] !== "") {
            if (!changeNameSurname["name"].match(/^((?=.*[a-z])|(?=.*[A-Z])).{3,}$/)) {
                errors["name"] = "Imie może zawierać tylko litery i składać się z co najmniej 3 znaków";
            }
        }

        //Surname
        if (changeNameSurname["surname"] !== "") {
            if (!changeNameSurname["surname"].match(/^((?=.*[a-z])|(?=.*[A-Z])).{3,}$/)) {
                errors["surname"] = "Nazwisko może zawierać tylko litery i składać się z co najmniej 3 znaków";
            }
        }

        this.setState({
            changeNameSurname: { ...this.state.changeNameSurname, [input]: e.target.value},
            errors:errors
        });
    };

    handleAddSubmitActivity = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/addUserActivity`, {
            addActivity: this.state.values.addActivity,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleRemoveSubmitActivity = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8000/removeUserActivity`, {
            removeActivity: this.state.values.removeActivity
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleChangeNameSurname = (e) => {
        e.preventDefault();
        this.setState({changeNameSurname:{
                errorMessage: '',
                name: this.state.changeNameSurname.name,
                surname: this.state.changeNameSurname.surname
            }});
        if(this.handleValidationNameSurname()){
            axios.post(`http://localhost:8000/changeUserNameSurname`, {
                name: this.state.changeNameSurname.name,
                surname: this.state.changeNameSurname.surname
            }).then(function (response) {
                console.log(response);
            }).catch( (error) =>{
                if(error.response){
                    this.setState({changeNameSurname:{
                            errorMessage: error.response.data.detail,
                            name: '',
                            surname: ''
                        },
                        errors:''
                    });
                }
            }).then(()=>{
                if (this.state.changeNameSurname.errorMessage === '') {
                    alert('Imie i nazwisko zostało zmieniowe');
                }
            });
        }
    }

    handleChangePassword = (e) => {
        e.preventDefault();
        this.setState({changePassword:{
                errorMessage: '',
                currentPassword: this.state.changePassword.currentPassword,
                password: this.state.changePassword.password,
                confirmedPassword: this.state.changePassword.confirmedPassword
            }});
        if(this.handleValidationPassword()){
            axios.post(`http://localhost:8000/changeUserPassword`, {
                currentPassword: this.state.changePassword.currentPassword,
                password: this.state.changePassword.password,
                confirmedPassword: this.state.changePassword.confirmedPassword
            }).then(function (response) {
                console.log(response);
            }).catch( (error) =>{
                if(error.response){
                    this.setState({changePassword:{
                            errorMessage: error.response.data.detail,
                            currentPassword: '',
                            password: '',
                            confirmedPassword: ''
                        },
                        errors:''
                    });
                }
            }).then(()=>{
                if (this.state.changePassword.errorMessage === '') {
                    alert('Hasło zostało zmieniowe');
                }
            });
        }
    }

    componentDidMount() {
        this.getUser();
        this.getUserActivities();
    }

    getUser(){
        axios.get('http://localhost:8000/showCurrentUser').then(user => {
            this.setState({
                email: user.data[0].email,
                name: user.data[0].name,
                surname: user.data[0].surname,
                city: user.data[0].city,
                street: user.data[0].street,
                avatar: user.data[0].avatar,
            });
        });
    }

    getUserActivities(){
        axios.get('http://localhost:8000/showUserActivities/currentUser').then(activities => {
            this.setState({
                values: {activities: activities.data}
            });
        });
    }

    getActivities(){
        axios.get('http://localhost:8000/api/activities').then(allActivities => {
            this.setState({
                values: {allActivities: allActivities.data}
            });
        });
    }

    render() {
        const {values,changePassword, changeNameSurname} = this.state;
        return (
            <div className="App">
                <Header/>
                <div className="Edit-information">
                    <div className="Edit-image">
                        <h3>Edytuj zdjęcie profilowe</h3>
                        <form>
                            <img className="Big-avatar" src={this.state.avatar} alt={"this is avatar image"}/>
                            <button className="Edit-image-button" type="submit">Zmien zdjęcie profilowe</button>
                        </form>
                    </div>
                    <div className="Edit-name-surname">
                        <h3>Edytuj Imię i Nazwisko</h3>
                        <h2>{this.state.name} {this.state.surname}</h2>
                        <form onSubmit={this.handleChangeNameSurname}>
                            <input
                                placeholder="Imię"
                                name="name"
                                value={changeNameSurname.name}
                                onChange={this.handleChangeNameSurnameValue("name")}
                            />
                            <span className="error">{this.state.errors["name"]}</span>
                            <input
                                placeholder="Nazwisko"
                                name="name"
                                value={values.surname}
                                onChange={this.handleChangeNameSurnameValue("surname")}
                            />
                            <span className="error">{this.state.errors["surname"]}</span>
                            <button className="Save-button" type="submit">Zapisz</button>
                        </form>
                    </div>
                    <div className="Edit-password">
                        <h3>Zmień hasło</h3>
                        <form onSubmit={this.handleChangePassword}>
                            {changePassword.errorMessage==='' ?
                                null
                                :
                                <p className="Messages">{changePassword.errorMessage}</p>
                            }
                            <input
                                name="currentPassword"
                                placeholder="Obecne Hasło"
                                type="password"
                                value={changePassword.currentPassword}
                                onChange={this.handleChangePasswordValue("currentPassword")}
                            />
                            <span className="error">{this.state.errors["currentPassword"]}</span>
                            <input
                                name="password"
                                placeholder="Nowe Hasło"
                                type="password"
                                value={changePassword.password}
                                onChange={this.handleChangePasswordValue("password")}
                            />
                            <span className="error">{this.state.errors["password"]}</span>
                            <input
                                name="confirmedPassword"
                                placeholder="Powtórz Hasło"
                                type="password"
                                value={changePassword.confirmedPassword}
                                onChange={this.handleChangePasswordValue("confirmedPassword")}
                            />
                            <span className="error">{this.state.errors["confirmedPassword"]}</span>
                            <button className="Save-button" type="submit">Zapisz</button>
                        </form>
                    </div>
                    <div className="Remove-activities">
                        <h3>Usuń aktywność</h3>
                        <form onSubmit={this.handleRemoveSubmitActivity}>
                            <select
                                value={values.removeActivity}
                                onChange={this.handleChange("removeActivity")}
                            >
                                {values.activities.map((activity) =>
                                    <option
                                        value={activity.id}
                                    >
                                        {activity.name}
                                    </option>
                                )}
                            </select>
                            <button className="Save-button" type="submit">Usuń</button>
                        </form>
                    </div>
                    <div className="Add-activities">
                        <h3>Dodaj aktywność</h3>
                        <form onSubmit={this.handleAddSubmitActivity}>
                            <select
                                value={values.addActivity}
                                onChange={this.handleChange("addActivity")}
                            >
                                <option value="Bieganie">Bieganie</option>
                                <option value="Rower">Rower</option>
                                <option value="Pływanie">Pływanie</option>
                                <option value="Piłka nożna">Piłka nożna</option>
                                <option value="Siłownia">Siłownia</option>
                            </select>
                            <button className="Save-button" type="submit">Dodaj</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withMedia(withRouter(EditProfileComponent));