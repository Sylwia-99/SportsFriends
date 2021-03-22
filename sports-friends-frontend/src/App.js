import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Notification from './pages/Notification';
import YourProfile from './pages/YourProfile';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleChat from './pages/SingleChat';
import Watched from './pages/Watched';
import Followers from './pages/Followers';
import EditProfile from './pages/EditProfile';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/messages" component={Messages}/>
                <Route path="/notification" component={Notification}/>
                <Route path="/yourProfile" component={YourProfile}/> 
                <Route path="/profile" component={Profile}/> 
                <Route path="/login" component={Login}/>   
                <Route path="/register" component={Register}/> 
                <Route path="/singleChat" extact component={SingleChat}/> 
                <Route path="/watched" component={Watched}/> 
                <Route path="/followers" extact component={Followers}/>  
                <Route path="/editProfile" extact component={EditProfile}/> 
                <Route path="/" extact component={Home}/> 
            </Switch>
        </Router>
    );
}

export default App;

