import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Messages from './pages/Messages';
import NewMessage from './pages/subpages/NewMessage';
import ReceiverMessage from './pages/subpages/ReceiverMessage';
import SendMessage from './pages/subpages/SendMessage';
import Notification from './pages/Notification';
import YourProfile from './pages/YourProfile';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleChat from './SingleChat';
import Watched from './pages/Watched';
import Followers from './pages/Followers';
import EditProfile from './pages/EditProfile';
import Home from "./pages/Home";
import Search from "./pages/Search";

class Navigation extends Component{
    render() {
        return (
            <div className="root">
                <Router>
                    <Switch>
                        <Route path="/messages" extact component={Messages}/>
                        <Route path="/newmessage" exact component={NewMessage}/>
                        <Route path="/receivermessage" exact component={ReceiverMessage}/>
                        <Route path="/sendmessage" exact component={SendMessage}/>
                        <Route path="/notification" extact component={Notification}/>
                        <Route path="/yourProfile" extact component={YourProfile}/>
                        <Route path="/profile/:profileId" extact component={Profile}/>
                        <Route path="/login" extact component={Login}/>
                        <Route path="/register" extact component={Register}/>
                        <Route path="/singleChat" extact component={SingleChat}/>
                        <Route path="/watched" extact component={Watched}/>
                        <Route path="/followers" extact component={Followers}/>
                        <Route path="/editProfile" extact component={EditProfile}/>
                        <Route path="/search" extact component={Search}/>
                        <Route path="/" extact component={Home}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default withRouter(Navigation);