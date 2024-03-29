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
        }
    }

    render() {
        return (
            <div className="root">
                    <Router>
                        <Switch>
                            <Route path="/messages" auth={this.state.auth} extact component={Messages}/>
                            <Route path="/newmessage" auth={this.state.auth} exact component={NewMessage}/>
                            <Route path="/receivermessage" auth={this.state.auth}  exact component={ReceiverMessage}/>
                            <Route path="/sendmessage" auth={this.state.auth} exact component={SendMessage}/>
                            <Route path="/notification" auth={this.state.auth} extact component={Notification}/>
                            <Route path="/yourProfile" auth={this.state.auth} extact component={YourProfile}/>
                            <Route path="/profile/:id" auth={this.state.auth} extact component={Profile}/>
                            <Route path="/login" auth={this.state.auth} extact component={Login}/>
                            <Route path="/register" auth={this.state.auth} extact component={Register}/>
                            <Route path="/singleChat" auth={this.state.auth} extact component={SingleChat}/>
                            <Route path="/watched" auth={this.state.auth} extact component={Watched}/>
                            <Route path="/followers" auth={this.state.auth} extact component={Followers}/>
                            <Route path="/editProfile" auth={this.state.auth} extact component={EditProfile}/>
                            <Route path="/search" auth={this.state.auth} extact component={Search}/>
                            <Route path="/chat"  auth={this.state.auth}  extact component={(props) =>
                                <Chat {...props} user={this.state.user}/> }/>
                            <Route path="/"  extact component={Home}/>
                        </Switch>
                    </Router>
            </div>
        )
    }
}

export default withRouter(Navigation);