import React, {Component} from 'react';
import '../styles/Avatar.css';
import {withRouter} from "react-router";
import axios from "axios";

class Avatar extends Component{
    constructor(props){
        super(props);
        this.state = {
            avatar: '',
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser(){
        axios.get('http://localhost:8000/showCurrentUser').then(user => {
            this.setState({
                avatar: user.data[0].avatar,
            });
            console.log(user);
        });
    }
    render(){
    return (
        <img className="small-avatar" src={this.state.avatar} alt={"this is avatar image"}/>
    )
}
}

export default withRouter(Avatar);