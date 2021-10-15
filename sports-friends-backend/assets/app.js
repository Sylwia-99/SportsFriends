import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import './bootstrap';
import {BrowserRouter } from 'react-router-dom';
import Navigation from "./Navigation";
import { MediaQueryProvider } from 'react-media-query-hoc';
import store from './store'
import * as actionCreators from './components/actions/conversation';

import './styles/Chat.css'

//store.dispatch(actionCreators.setEmail(document.querySelector('#app').dataset.email));

const App =  () =>{
        return(
                <MediaQueryProvider>
                <BrowserRouter>
                    <div>
                        <Navigation/>
                    </div>
                </BrowserRouter>
                </MediaQueryProvider>

        )
}

ReactDOM.render(
            <App/>,
    document.getElementById("app"));


