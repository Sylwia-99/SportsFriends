import React, {useEffect} from 'react';
import { Route, Switch} from 'react-router-dom';

import Left from "../components/AllConversations/Left/Left";
import Right from "../components/AllConversations/Right/Right";
import Blank from "../components/AllConversations/Right/Blank";
import Header from "../components/Header";
import store from "../store";
import {Provider} from "react-redux";
import * as actionCreators from "../components/actions/conversation";

const Chat = (props) => {
    useEffect(() =>{
        store.dispatch(actionCreators.setEmail(props.user.email));
    },[]);


    return (
        <Provider store={store}>
        <div className="App">
            <Header/>
            <div className="conversations-container">
                <div className="conversations-content">
                    <Left {...props} email={props.user.email}/>
                    <Switch>
                        <Route
                            path="/chat/:id/conversation/:id" component={(props) =>
                            <Right {...props} key={props.match.params.id}/> }
                        />
                        <Route path="/chat/:id" component={Blank} exact />
                    </Switch>
                </div>
            </div>
        </div>
        </Provider>
    );
}

export default Chat;