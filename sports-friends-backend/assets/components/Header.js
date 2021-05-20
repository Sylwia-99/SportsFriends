import React, {Component} from 'react';
import '../styles/Header.css';
import Avatar from './Avatar';
import { FiSearch, FiLogIn } from 'react-icons/fi';
import { FaHome, FaHeart } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";
import logo from '../images/logo.png';
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import {Api} from '../apiHandler/apiHandler';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            users: [],
            click: false,
            err: '',
            avatar: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    handleValueSubmit = (e) => {
        e.preventDefault();
        Api.showUser(this.state.value).then( response =>{
            if(response.status === 200) {
                this.setState({
                    err: false,
                    users: response.data,
                    click: true
                });
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                err: true,
                name: state.value
            })
        });
    }

    componentDidMount(){
        Api.currentUser().then( response =>{
            if(response.status === 200){
                this.setState({
                    avatar: response.data[0].avatar,
                });
            }
        })
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} alt={"this is a logo image"}/>
                <SearchInput
                    value={this.state.value}
                    change={this.handleInputChange}
                    submit={this.handleValueSubmit}
                />
                {
                    !this.state.click ? null :
                    <SearchResult
                    users={this.state}
                    />
                }
                <div className="icons">
                    <Link to="/search" className="search-icon"><FiSearch/></Link>
                    <Link to="/"><FaHome/></Link>
                    <Link to="/messages"><BiMessageDetail/></Link>
                    <Link to="/notification"><FaHeart/></Link>
                    {this.state.avatar === '' ?
                        <Link to="/login"><FiLogIn/></Link>
                        :
                        <Link to="/yourProfile"><Avatar/></Link>
                    }
                </div>
            </header>
        )
    }
}

export default withRouter(Header);