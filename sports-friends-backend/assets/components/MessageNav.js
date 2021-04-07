import React, {Component} from 'react';
import { NavLink} from 'react-router-dom';
import '../styles/MessageNav.css';
import {withRouter} from "react-router";

class MessageNav extends Component{
    render() {
        return (
            <div className='nav-message'>
                <ul className='nav-menu-message'>
                    <li className='nav-item'>
                        <NavLink to="/newmessage" className='nav-message-links'>Nowa Wiadomość</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/receivermessage" className='nav-message-links'>Skrzynka odbiorcza</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/sendmessage" className='nav-message-links'>Wiadomości wysłane</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(MessageNav);