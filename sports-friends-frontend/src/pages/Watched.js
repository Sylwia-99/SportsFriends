import React from 'react';
import Header from '../components/Header';

function Watched() {
    return (
        <div className="App">
            <Header/>
            <main>
                <section className="Friends">
                    <ul>
                        <li>
                            <div className="Watched-friend">
                                <img className="Medium-avatar" src="images/avatar.jpg"/>
                                <h3>Sylwia Rusek</h3>
                                <button className="Remove-friend-button" type="submit">Usuń</button>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div className="Watched-friend">
                                <img className="Medium-avatar" src="images/avatar.jpg"/>
                                <h3>Sylwia Rusek</h3>
                                <button className="Remove-friend-button" type="submit">Usuń</button>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div className="Watched-friend">
                                <img className="Medium-avatar" src="images/avatar.jpg"/>
                                <h3>Sylwia Rusek</h3>
                                <button className="Remove-friend-button" type="submit">Usuń</button>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div className="Watched-friend">
                                <img className="Medium-avatar" src="images/avatar.jpg"/>
                                <h3>Sylwia Rusek</h3>
                                <button className="Remove-friend-button" type="submit">Usuń</button>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div className="Watched-friend">
                                <img className="Medium-avatar" src="images/avatar.jpg"/>
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

export default Watched;