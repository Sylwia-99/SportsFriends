import React, {Component} from 'react';
import Header from './components/Header';
import './styles/YourProfile.css';
import {BiFootball} from 'react-icons/bi';
import {FaRunning, FaMapMarkerAlt, FaSwimmer} from 'react-icons/fa';
import {MdDirectionsBike} from 'react-icons/md';
import {CgGym} from 'react-icons/cg';
import {withRouter} from "react-router";
import avatar from './images/avatar.jpg';
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            city: '',
            street: '',
            avatar: '',
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser(){
        axios.get('http://localhost:8000/user/12').then(user => {
            this.setState({
                name: user.data[0].name,
                surname: user.data[0].surname,
                city: user.data[0].city,
                street: user.data[0].street,
                avatar: user.data[0].avatar,
            });
            console.log(user);
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
                            <button className="Follow">Obserwuj</button>
                    </div>
                    <div className="AboutMe">
                        <h2>O mnie</h2>
                        <hr/>
                        <h5><FaMapMarkerAlt/> {this.state.city}, ul. {this.state.street}</h5>
                        <h2>Moje Aktywności</h2>
                        <hr/>
                        <div className="Activities">
                            <div>
                                <h4><FaRunning/> Bieganie</h4>
                            </div>
                            <div>
                                <h4><MdDirectionsBike/> Rower</h4>
                            </div>
                            <div>
                                <h4><FaSwimmer/> Pływanie</h4>
                            </div>
                            <div>
                                <h4><BiFootball/> Piłka nożna</h4>
                            </div>
                            <div>
                                <h4><CgGym/> Siłownia</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Send-message-profile">
                    <form className="Send-message-form">
                        <input className="Send-input"/>
                        <button className="Send-button">Wyślij</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withMedia(withRouter(Profile));