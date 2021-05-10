import React, {Component} from 'react';
import '../styles/Header.css';
import Avatar from './Avatar';
import { FiSearch } from 'react-icons/fi';
import { FaHome, FaHeart } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";
import logo from '../images/logo.png';
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import axios from "axios";

class Header extends Component{
    state = {
        value:'',
        users:[],
        click:false,
        err:''
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    handleValueSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8000/showSearchedUsers/${this.state.value}`)
            .then(users => {
                this.setState({
                    err: false,
                    users: users.data,
                    click: true
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    err: true,
                    name: state.value
                })
            })
    }
    /*componentDidUpdate(prevProps, prevState){
        if(this.state.value.length === 0 ) return;
        if(prevState.value !== this.state.value){
            axios.get(`http://localhost:8000/showSearchedUsers/${this.state.value}`)
                .then(users => {
                    this.setState({
                        err: false,
                        users: users.data
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        err: true,
                        name: state.value
                    })
                })
        }
    }*/

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
                    <Link to="/yourProfile"><Avatar/></Link>
                </div>
            </header>
        )
    }
}

export default withRouter(Header);