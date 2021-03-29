import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import './bootstrap';
import {BrowserRouter } from 'react-router-dom';
import Navigation from "./Navigation";
import { MediaQueryProvider } from 'react-media-query-hoc';


const App =  (props) =>{
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

ReactDOM.render(<App/>, document.getElementById("root"));