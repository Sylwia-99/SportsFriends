import React from 'react';
import './Main.css';
import {Link} from 'react-router-dom';

function Main() {
    return(
        <main>
            <section>
                <Link to="/Profile" className="avatar">
                    <h3>Sylwia Rusek</h3>
                    <h4>Siłownia</h4>
                </Link>
                <Link to="/Profile" className="avatar">
                    <h3>Sylwia Rusek</h3>
                    <h4>Siłownia</h4>
                </Link>
                <Link to="/Profile" className="avatar">
                    <h3>Sylwia Rusek</h3>
                    <h4>Siłownia</h4>
                </Link>
                <Link to="/Profile" className="avatar">
                    <h3>Sylwia Rusek</h3>
                    <h4>Siłownia</h4>
                </Link>
                <Link to="/Profile" className="avatar">
                    <h3>Sylwia Rusek</h3>
                    <h4>Siłownia</h4>
                </Link>
                <Link to="/Profile" className="avatar">
                    <h3>Sylwia Rusek</h3>
                    <h4>Siłownia</h4>
                </Link>
                <Link to="/Profile" className="avatar">
                    <h3>Sylwia Rusek</h3>
                    <h4>Siłownia</h4>
                </Link>
            </section>
        </main>
    )
}

export default Main;
