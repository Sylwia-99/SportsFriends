import React, {Component} from 'react';
import '../styles/Avatar.css';
import {withRouter} from "react-router";
import {Api} from '../apiHandler/apiHandler';

class Avatar extends Component{
    constructor(props){
        super(props);
        this.state = {
            avatar: '',
        }
    }

    componentDidMount() {
        Api.currentUser().then( response =>{
            if(response.status === 200){
                this.setState({
                    avatar: response.data[0].avatar,
                });
            }
        })
    }
    render(){
        return (
            <img className="small-avatar" src={this.state.avatar} alt={"this is avatar image"}/>
            )
    }
}

export default withRouter(Avatar);