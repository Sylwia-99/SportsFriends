import React, {Component} from 'react';
import Header from './Header';
import '../styles/YourProfile.css';
import {BiFootball} from 'react-icons/bi';
import {FaRunning, FaMapMarkerAlt, FaSwimmer} from 'react-icons/fa';
import {MdDirectionsBike} from 'react-icons/md';
import {CgGym} from 'react-icons/cg';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import { withMedia } from 'react-media-query-hoc';
import {Api} from '../apiHandler/apiHandler';

class YourProfileComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            user: '',
            email: '',
            name: '',
            surname: '',
            city: '',
            street: '',
            avatar: '',
            activities: []
        }
    }

    componentDidMount() {
        this.getUser();
        this.getUserActivities();
    }

    getUser(){
        Api.currentUser().then( response =>{
            if(response.status === 200){
                this.setState({
                    id:  response.data[0].id,
                    email: response.data[0].email,
                    name: response.data[0].name,
                    surname: response.data[0].surname,
                    city: response.data[0].city,
                    street: response.data[0].street,
                    avatar: response.data[0].avatar,
                });
            }
        })
    }

    getUserActivities(){
        Api.currentUserActivities().then( response =>{
            if(response.status === 200) {
                this.setState({
                    activities: response.data
                });
            }
        });
    }

    logout(){
        Api.logout().then( response =>{
            if(response.status === 200){
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                localStorage.removeItem('roles');
                console.log('wylogowano');
            }
        }).then(() => location.href = '/login')
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Your-information">
                        <div className="Profile">
                        <img className="Big-avatar" src={this.state.avatar} alt={"this is avatar image"}/>
                        <h2>{this.state.name} {this.state.surname}</h2>
                    </div>
                    <div className="AboutMe">
                        <h2>O mnie</h2>
                        <hr/>
                        <h5><FaMapMarkerAlt/> {this.state.city}, ul. {this.state.street}</h5>
                        <h2>Moje Aktywności</h2>
                        <hr/>
                        <div className="Activities">
                            {this.state.activities.map(activity =>
                            <div key={activity.id}>
                                {
                                    activity.name==="Bieganie" ? <h4><FaRunning/> Bieganie</h4> : null
                                }
                                {
                                    activity.name==="Rower" ? <h4><MdDirectionsBike/> Rower</h4> : null
                                }
                                {
                                    activity.name==="Pływanie" ? <h4><FaSwimmer/> Pływanie</h4> : null
                                }
                                {
                                    activity.name==="Piłka nożna" ? <h4><BiFootball/> Piłka nożna</h4> : null
                                }
                                {
                                    activity.name==="Siłownia" ? <h4><CgGym/> Siłownia</h4> : null
                                }
                                {
                                    activity.name===null ? <h4> Brak aktywności</h4> : null
                                }
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="Edition">
                    <Link to="/editProfile">
                        <button className="Edition-button">Edycja Profilu</button>
                    </Link>
                    <Link to="/watched">
                        <button className="Edition-button">Obserwowani</button>
                    </Link>
                    <Link to="/followers">
                        <button className="Edition-button">Obserwujący</button>
                    </Link>
                    <button className="Edition-button" onClick={this.logout}>Wyloguj</button>
                </div>
            </div>
        );
    }
}

export default withMedia(withRouter(YourProfileComponent));