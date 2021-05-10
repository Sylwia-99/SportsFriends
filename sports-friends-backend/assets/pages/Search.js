import React, {Component, useContext} from 'react';
import '../styles/Search.css';
import logo from '../images/logo.png';
import {withRouter} from 'react-router';
import { withMedia } from 'react-media-query-hoc';
import axios from "axios";
import SearchInput from "../components/SearchInput";
import SearchResult from "../components/SearchResult";

class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            media: this.props.media,
            search: {
                value:'',
                users:[],
                err:''
            }
        }
    }

    handleInputChange = (e) => {
        this.setState({
            search: {
                value: e.target.value
            }});
    };

    handleValueSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8000/showSearchedUsers/${this.state.search.value}`)
            .then(users => {
                this.setState({
                    search: {
                        err: false,
                        users: users.data,
                    }})
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    search: {
                        err: true,
                        name: state.value
                    }})
            })
    }

    componentDidMount() {
        if(!window.matchMedia("(max-width: 1200px)").matches){
            location.href = '/';
            console.log('przekierowanie');
        }
    }


    render()
    {
        return (
            <div>
                <header className="Search-header">
                    <img src={logo} alt={"this is a logo image"}/>
                    <SearchInput className="phone-search"
                        value={this.state.search.value}
                        change={this.handleInputChange}
                        submit={this.handleValueSubmit}
                    />
                    <SearchResult
                        users={this.state.search}
                    />
                </header>
            </div>
        )
    }
}

export default withMedia(withRouter(Search));