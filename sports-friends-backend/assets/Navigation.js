import React, {Component, useState} from 'react';
import {withRouter} from 'react-router';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Notification from './pages/Notification';
import YourProfile from './pages/YourProfile';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Watched from './pages/Watched';
import Followers from './pages/Followers';
import EditProfile from './pages/EditProfile';
import Home from "./pages/Home";
import Search from "./pages/Search";
import Chat from './pages/Chat'
import {Api} from "./apiHandler/apiHandler";

const ProtectedRoute = ({component: Component, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={ () => auth? (
                    <Component/>
                ):
                (
                    <Redirect to="/"/>
                )}
        />
    )
}

class Navigation extends Component{
    state = {
        auth: false,
        user: {
            id: '',
            user: '',
            email: '',
            name: '',
            surname: '',
            city: '',
            street: '',
        },
        avatar: null,
        users: [],
        noUsers: false,
        activities:[],
    };

    componentDidMount() {
        const loggedUser = localStorage.getItem('id')
        if (loggedUser) {
            this.setState({auth:true});
            Api.currentUser().then( response =>{
                if(response.status === 200){
                    this.setState({user:{
                        id:  response.data[0].id,
                        email: response.data[0].email,
                        name: response.data[0].name,
                        surname: response.data[0].surname,
                        city: response.data[0].city,
                        street: response.data[0].street,
                    }});
                    import(`../src/uploads/${response.data[0].avatar}`)
                        .then(({default: url}) =>{
                                this.setState({ avatar: url});
                            }
                        )
                }
            });

            Api.currentUserActivities().then( response =>{
                if(response.status === 200) {
                    this.setState({activities: response.data});
                }
            });

            Api.users().then( response =>{
                if(response.status === 200){
                    this.setState({users:response.data});
                    if(response.data.length === 0){
                        this.setState({ noUsers: true});
                    }
                }

            });
        }
    }

    render() {
        return (
            <div className="root">
                    <Router>
                        <Switch>
                            <ProtectedRoute path="/notification" auth={this.state.auth} extact component={(props) =>
                                <Notification {...props} user = {this.state.user} avatar = {this.state.avatar}/>}/>
                            <ProtectedRoute path="/yourProfile" auth={this.state.auth} extact component={(props) =>
                                <YourProfile {...props} user = {this.state.user} avatar = {this.state.avatar} activities = {this.state.activities}/>}/>
                            <ProtectedRoute path="/profile/:id" auth={this.state.auth} extact component={(props) =>
                                <Profile {...props} user = {this.state.user} avatar = {this.state.avatar}/>}/>
                            <Route path="/login" extact component={Login}/>
                            <Route path="/register" extact component={Register}/>
                            <ProtectedRoute path="/watched" auth={this.state.auth} extact component={(props) =>
                                <Watched {...props} user = {this.state.user} avatar = {this.state.avatar}/>}/>
                            <ProtectedRoute path="/followers" auth={this.state.auth} extact component={(props) =>
                                <Followers {...props} user = {this.state.user} avatar = {this.state.avatar}/>}/>
                            <ProtectedRoute path="/editProfile" auth={this.state.auth} extact component={(props) =>
                                <EditProfile {...props} user = {this.state.user} avatar = {this.state.avatar} activities = {this.state.activities}/>}/>
                            <ProtectedRoute path="/search" auth={this.state.auth} extact component={(props) =>
                                <Search {...props} user = {this.state.user} avatar = {this.state.avatar}/>}/>
                            <ProtectedRoute path="/chat"  auth={this.state.auth} extact component={(props) =>
                                <Chat {...props} user={this.state.user} avatar = {this.state.avatar}/>}/>
                            <Route path="/" extact component={(props) =>
                                <Home {...props} user={this.state.user} avatar={this.state.avatar} users={this.state.users} noUsers={this.state.noUsers} />}/>
                        </Switch>
                    </Router>
            </div>
        )
    }
}

export default withRouter(Navigation);