import React, {Component} from 'react';
import '../styles/Avatar.css';
import {withRouter} from "react-router";
import avatar from '../images/avatar.jpg';

class Avatar extends Component{
    render(){
    return (
        <img className="small-avatar" src={avatar} alt={"this is avatar image"}/>
    )
}
}

export default withRouter(Avatar);