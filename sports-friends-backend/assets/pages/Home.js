import React, {Component} from 'react';
import Header from '../components/Header';
import {withRouter} from 'react-router';
import Main from "../components/Main";
import { withMedia } from 'react-media-query-hoc';

class Home extends Component{
    render()
    {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        )
    }
}

export default withMedia(withRouter(Home));