import React from 'react';
import WatchedComponent from '../components/WatchedComponent';

const Watched = (props) =>{
    return (
        <WatchedComponent {...props} user = {props.user} avatar = {props.avatar}/>
    );
}

export default Watched;