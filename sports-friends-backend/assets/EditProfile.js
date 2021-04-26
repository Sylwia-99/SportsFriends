import React, {Component} from 'react';
import Header from './components/Header';
import './styles/EditProfile.css';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";

class EditProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            values:{
                avatar: '',
                name: '',
                surname: '',
                currentPassword: '',
                password: '',
                confirmedPassword: '',
                removeActivity: '',
                addActivity: '',
                activities: []
            }
        }
    }

    handleChange = (input) => (e) => {
        this.setState({
            values: { ...this.state.values, [input]: e.target.value}
        });
    };

    handleAddSubmitActivity = (e) => {
        console.log(e);
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
        console.log(e);
        e.preventDefault();

        axios.post(`http://localhost:8000/removeUserActivity`, {
            removeActivity: this.state.values.removeActivity,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getUser();
        this.getUserActivities();
    }

    getUser(){
        axios.get('http://localhost:8000/user/13').then(user => {
            this.setState({
                email: user.data[0].email,
                name: user.data[0].name,
                surname: user.data[0].surname,
                city: user.data[0].city,
                street: user.data[0].street,
                avatar: user.data[0].avatar,
            });
            console.log(user);
        });
    }

    getUserActivities(){
        axios.get('http://localhost:8000/userActivities/13').then(activities => {
            this.setState({
                values: {activities: activities.data}
            });
            console.log(activities);
        });
    }

    getActivities(){
        axios.get('http://localhost:8000/api/activities').then(allActivities => {
            this.setState({
                values: {allActivities: allActivities.data}
            });
            console.log(allActivities);
        });
    }

    render() {
        const {values} = this.state;
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
                        <form>
                            <input
                                placeholder="Imię"
                                name="name"
                                value={values.name}
                                onChange={this.handleChange("name")}
                            />
                            <input
                                placeholder="Nazwisko"
                                name="name"
                                value={values.surname}
                                onChange={this.handleChange("surname")}
                            />
                            <button className="Save-button" type="submit">Zapisz</button>
                        </form>
                    </div>
                    <div className="Edit-password">
                        <h3>Zmień hasło</h3>
                        <form>
                            <input
                                name="currentPassword"
                                placeholder="Obecne Hasło"
                                type="text"
                                value={values.currentPassword}
                                onChange={this.handleChange("currentPassword")}
                            />
                            <input
                                name="password"
                                placeholder="Nowe Hasło"
                                type="text"
                                value={values.password}
                                onChange={this.handleChange("password")}
                            />
                            <input
                                name="confirmPassword"
                                placeholder="Powtórz Hasło"
                                type="text"
                                value={values.confirmPassword}
                                onChange={this.handleChange("confirmPassword")}
                            />
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

export default withMedia(withRouter(EditProfile));