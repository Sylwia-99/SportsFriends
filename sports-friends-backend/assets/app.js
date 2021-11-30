import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import './bootstrap';
import {BrowserRouter } from 'react-router-dom';
import Navigation from "./Navigation";
import { MediaQueryProvider } from 'react-media-query-hoc';
import './styles/Chat.css'
import {Provider} from "react-redux";
import storeFollowers from "./storeFollowers";

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
    <Provider store={storeFollowers}>
            <App/>
    </Provider>,
    document.getElementById("app"));


