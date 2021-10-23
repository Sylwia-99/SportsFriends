import React from 'react';
import Header from '../components/Header';
import Main from "../components/Main";

const Home = (props) =>{
    return (
        <div>
            <Header {...props} user = {props.user} avatar = {props.avatar}/>
            <Main {...props} users = {props.users} noUsers = {props.noUsers}/>
        </div>
    );
}
export default Home;