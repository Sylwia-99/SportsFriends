import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Messages from './Messages';
import Notification from './Notification';
import YourProfile from './YourProfile';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import SingleChat from './SingleChat';
import Watched from './Watched';
import Followers from './Followers';
import EditProfile from './EditProfile';
import Home from "./Home";

class Navigation extends Component{
    render() {
        return (
            <div className="root">
                <Router>
                    <Switch>
                        <Route path="/messages" extact component={Messages}/>
                        <Route path="/notification" extact component={Notification}/>
                        <Route path="/yourProfile" extact component={YourProfile}/>
                        <Route path="/profile" extact component={Profile}/>
                        <Route path="/login" extact component={Login}/>
                        <Route path="/register" extact component={Register}/>
                        <Route path="/singleChat" extact component={SingleChat}/>
                        <Route path="/watched" extact component={Watched}/>
                        <Route path="/followers" extact component={Followers}/>
                        <Route path="/editProfile" extact component={EditProfile}/>
                        <Route path="/" extact component={Home}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default withRouter(Navigation);