import React from 'react';
import './Header.css';
import Avatar from './Avatar';
import { FiSearch } from 'react-icons/fi';
import { FaHome, FaHeart } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/all';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header className="App-header">
            <img src="logo.png"></img>
            <div className="search">
                <input className="search-input" placeholder="Szukaj"></input>
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

export default Header;