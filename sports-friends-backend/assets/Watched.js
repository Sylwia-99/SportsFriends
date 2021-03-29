import React, {Component} from 'react';
import Header from './components/Header';
import {withRouter} from "react-router";
import avatar from "./images/avatar.jpg";
import { withMedia } from 'react-media-query-hoc';

class Watched extends Component{
    render()
    {
        return (
            <div className="App">
                <Header/>
                <main>
                    <section className="Friends">
                        <ul>
                            <li>
                                <div className="Watched-friend">
                                    <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                                    <h3>Sylwia Rusek</h3>
                                    <button className="Remove-friend-button" type="submit">Usuń</button>
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <div className="Watched-friend">
                                    <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                                    <h3>Sylwia Rusek</h3>
                                    <button className="Remove-friend-button" type="submit">Usuń</button>
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <div className="Watched-friend">
                                    <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                                    <h3>Sylwia Rusek</h3>
                                    <button className="Remove-friend-button" type="submit">Usuń</button>
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <div className="Watched-friend">
                                    <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                                    <h3>Sylwia Rusek</h3>
                                    <button className="Remove-friend-button" type="submit">Usuń</button>
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <div className="Watched-friend">
                                    <img className="Medium-avatar" src={avatar} alt={"this is avatar image"}/>
                                    <h3>Sylwia Rusek</h3>
                                    <button className="Remove-friend-button" type="submit">Usuń</button>
                                </div>
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
        );
    }
}

export default withMedia(withRouter(Watched));