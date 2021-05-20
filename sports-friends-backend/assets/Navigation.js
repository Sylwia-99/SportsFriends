import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
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
    };

    componentDidMount() {
        const loggedUser = localStorage.getItem('id')
        if (loggedUser) {
            this.setState({auth:true});
        }
    }

    render() {
        return (
            <div className="root">
                    <Router>
                        <Switch>
                            <ProtectedRoute path="/messages" auth={this.state.auth} extact component={Messages}/>
                            <ProtectedRoute path="/newmessage" auth={this.state.auth} exact component={NewMessage}/>
                            <ProtectedRoute path="/receivermessage" auth={this.state.auth}  exact component={ReceiverMessage}/>
                            <ProtectedRoute path="/sendmessage" auth={this.state.auth} exact component={SendMessage}/>
                            <ProtectedRoute path="/notification" auth={this.state.auth} extact component={Notification}/>
                            <ProtectedRoute path="/yourProfile" auth={this.state.auth} extact component={YourProfile}/>
                            <ProtectedRoute path="/profile/:profileId" auth={this.state.auth} extact component={Profile}/>
                            <Route path="/login" auth={this.state.auth} extact component={Login}/>
                            <ProtectedRoute path="/register" auth={this.state.auth} extact component={Register}/>
                            <ProtectedRoute path="/singleChat" auth={this.state.auth} extact component={SingleChat}/>
                            <ProtectedRoute path="/watched" auth={this.state.auth} extact component={Watched}/>
                            <ProtectedRoute path="/followers" auth={this.state.auth} extact component={Followers}/>
                            <ProtectedRoute path="/editProfile" auth={this.state.auth} extact component={EditProfile}/>
                            <ProtectedRoute path="/search" auth={this.state.auth} extact component={Search}/>
                            <Route path="/" extact component={Home}/>
                        </Switch>
                    </Router>
            </div>
        )
    }
}

export default withRouter(Navigation);