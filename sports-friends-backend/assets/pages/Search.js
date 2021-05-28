import React, {useEffect, useState} from 'react';
import '../styles/Search.css';
import logo from '../images/logo.png';
import { withMedia } from 'react-media-query-hoc';
import SearchInput from "../components/search/SearchInput";
import SearchResult from "../components/search/SearchResult";
import {Api} from "../apiHandler/apiHandler";
import {BsArrowLeft} from "react-icons/bs";
import {useHistory} from "react-router";

const Search = () =>{
    let history = useHistory();

    function handleClick() {
        history.push("/");
    }

    const[users, setUsers] = useState({
        users: [],
        click: false,
        err: '',
        value: ''
    });

    const handleInputChange = (e) => {
        e.preventDefault();
        setUsers({
            value: e.target.value
        });
    };

    const handleValueSubmit = () => {
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
        });
    }

    useEffect(() =>{
        if(!window.matchMedia("(max-width: 1200px)").matches){
            history.push('/');
            console.log('przekierowanie');
        }
    },[]);

    return (
            <div>
                <header className="Search-header">
                    <img src={logo} alt={"this is a logo image"}/>
                    <SearchInput className="phone-search"
                        value={users.value}
                        change={handleInputChange}
                        submit={handleValueSubmit}
                    />

                    <SearchResult
                        users={users}
                    />
                </header>
                <BsArrowLeft
                    className="Rowback-search"
                    onClick={()=>handleClick()}
                />
            </div>
        )
}

export default withMedia(Search);