import React, {Component} from 'react';
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
import AdvancedSearch from './pages/AdvancedSearch'
import Chat from './pages/Chat'
import {Api} from "./apiHandler/apiHandler";
import * as actionCreators from './components/actions/followers'
import {connect} from "react-redux";
import AdministratorPanel from "./pages/AdministratorPanel";

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

const mapStateToProps = (state) => {
    return state;
};

class Navigation extends Component{
    constructor(props){
        super(props);
    }

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
        activities:[],
        allActivities: [],
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

            /*Api.users().then( response =>{
                if(response.status === 200){
                    this.setState({users:response.data});
                    if(response.data.length === 0){
                        this.setState({ noUsers: true});
                    }
                }

            });*/



            this.props.fetchWatchers().then((response) => {
                this.setState({watchers: this.props.watchers});
            });


            this.props.fetchFollowers().then((response) => {
                this.setState({followers: this.props.followers});
            });

            this.props.fetchAllActivities().then((response) => {
                this.setState({allActivities: this.props.allActivities})
            });
        }

        this.props.fetchUsers().then((response) => {
            this.setState({users: this.props.users});
            /*if(this.props.users.length ===0){
                this.setState({ noUsers: true});
            }*/
        });
    }

    render() {
        return (
            <div className="root">
                    <Router>
                        <Switch>
                            <Route path="/login" extact component={Login}/>
                            <Route path="/register" extact component={Register}/>
                            <ProtectedRoute path="/notification" auth={this.state.auth} extact component={(props) =>
                                <Notification {...props} user = {this.state.user} avatar = {this.state.avatar} followers = {this.props.followers} watchers = {this.props.watchers} />}/>
                            <ProtectedRoute path="/yourProfile" auth={this.state.auth} extact component={(props) =>
                                <YourProfile {...props} user = {this.state.user} avatar = {this.state.avatar} activities = {this.state.activities}/>}/>
                            <ProtectedRoute path="/profile/:id" auth={this.state.auth} extact component={(props) =>
                                <Profile {...props} user = {this.state.user} avatar = {this.state.avatar} watchers = {this.props.watchers}/>}/>
                            <ProtectedRoute path="/watched" auth={this.state.auth} extact component={(props) =>
                                <Watched {...props} user = {this.state.user} avatar = {this.state.avatar} watchers = {this.props.watchers}/>}/>
                            <ProtectedRoute path="/followers" auth={this.state.auth} extact component={(props) =>
                                <Followers {...props} user = {this.state.user} avatar = {this.state.avatar} followers = {this.props.followers} watchers = {this.props.watchers}/>}/>
                            <ProtectedRoute path="/editProfile" auth={this.state.auth} extact component={(props) =>
                                <EditProfile {...props} user = {this.state.user} avatar = {this.state.avatar} activities = {this.state.activities}/>}/>
                            <Route path="/search" extact component={(props) =>
                                <Search {...props} user = {this.state.user} avatar = {this.state.avatar}/>}/>
                            <Route path="/advancedSearch" extact component={(props) =>
                                <AdvancedSearch {...props} user = {this.state.user} avatar = {this.state.avatar} users={this.props.users} noUsers={this.props.noUsers} />}/>
                            <ProtectedRoute path="/chat"  auth={this.state.auth} extact component={(props) =>
                                <Chat {...props} user={this.state.user} avatar = {this.state.avatar}/>}/>
                            <ProtectedRoute path="/adminPanel"  auth={this.state.auth} extact component={(props) =>
                                <AdministratorPanel {...props} user={this.state.user} avatar = {this.state.avatar} users={this.props.users} allActivities={this.props.allActivities} />}/>
                            <Route path="/" extact component={(props) =>
                                <Home {...props} user={this.state.user} avatar={this.state.avatar} users={this.props.users} noUsers={this.props.noUsers} />}/>
                        </Switch>
                    </Router>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, actionCreators)(Navigation));