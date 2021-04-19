import React, {Component} from 'react';
import '../styles/Header.css';
import Avatar from './Avatar';
import { FiSearch } from 'react-icons/fi';
import { FaHome, FaHeart } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import logo from '../images/logo.png';

class Header extends Component{
    render() {
        return (
            <header className="App-header">
                <img src={logo} alt={"this is a logo image"}/>
                <div className="search">
                    <input className="search-input" placeholder="Szukaj"/>
                    <button className="search-button"><FiSearch/></button>
                </div>
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