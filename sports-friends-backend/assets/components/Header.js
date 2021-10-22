import React, {useEffect, useState} from 'react';
import '../styles/Header.css';
import { FiSearch, FiLogIn } from 'react-icons/fi';
import { FaHome, FaHeart } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import SearchInput from "./search/SearchInput";
import SearchResult from "./search/SearchResult";
import {Api} from '../apiHandler/apiHandler';

const Header = () =>{
    const UserId = localStorage.getItem('id');

    const[user, setUser] = useState({
        avatar: ''
    });

    const[users, setUsers] = useState({
        users: [],
        click: false,
        err: '',
        value: ''
    });

    const handleInputChange = (e) =>{
        e.preventDefault();
        setUsers({
            value: e.target.value
        });
    }

    const handleValueSubmit = () =>{
        Api.showUser(users.value).then( response =>{
            if(response.status === 200) {
                setUsers({
                    err: false,
                    users: response.data,
                    click: true
                });
            }
        }).catch(err => {
            console.log(err);
            setUsers({
                err: true,
                //name: state.value
            })
        });
    }

    useEffect(() =>{
        Api.currentUser().then( response =>{
            if(response.status === 200){
                import(`../../src/uploads/${response.data[0].avatar}`)
                    .then(({default: url}) =>{
                        setUser({
                            avatar: url,
                        });
                    }
                )
            }
        })
    },[]);


    return (
    <header className="App-header">
        <img src={logo} alt={"this is a logo image"}/>
        <SearchInput
            value={users.value}
            change={handleInputChange}
            submit={handleValueSubmit}
        />
        {
            !users.click ? null :
                <SearchResult
                    users={users}
                />
        }
        <div className="icons">
            <Link to="/search" className="search-icon"><FiSearch/></Link>
            <Link to="/"><FaHome/></Link>
                <Link to="/chat"><BiMessageDetail/></Link>
            <Link to="/notification"><FaHeart/></Link>
            {user.avatar === '' ?
                <Link to="/login"><FiLogIn/></Link>
                :
                    <Link to="/yourProfile">
                    <span className="small">
                    <img className="small-avatar" src={user.avatar} alt={"this is avatar image"}/>
                    </span>
                </Link>
            }
        </div>
    </header>
    )
}

export default Header;