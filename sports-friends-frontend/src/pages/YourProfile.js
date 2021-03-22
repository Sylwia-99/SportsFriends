import React from 'react';
import Header from '../components/Header';
import './YourProfile.css';
import {BiFootball} from 'react-icons/bi';
import {FaRunning, FaMapMarkerAlt, FaSwimmer} from 'react-icons/fa';
import {MdDirectionsBike} from 'react-icons/md';
import {CgGym} from 'react-icons/cg';
import {Link} from 'react-router-dom';

function YourProfile() {
    return (
        <div className="App">
            <Header/>
            <div className="Information">
                <div className="Profile">
                    <img className="Big-avatar" src="images/avatar.jpg"></img>
                    <h2>Imie Nazwisko</h2>
                </div>
                <div className="AboutMe">
                    <h2>O mnie</h2>
                    <hr/>
                    <h5> <FaMapMarkerAlt/> Kraków, ul. Warszawska</h5>                    
                    <h2>Moje Aktywności</h2>
                    <hr/>
                    <div className="Activities">
                        <div>
                            <h4><FaRunning/> Bieganie</h4>
                        </div>
                        <div>
                            <h4><MdDirectionsBike/> Rower</h4>
                        </div>
                        <div>
                            <h4><FaSwimmer/> Pływanie</h4>
                        </div>
                        <div>
                            <h4><BiFootball/> Piłka nożna</h4>
                        </div>
                        <div>
                            <h4><CgGym/> Siłownia</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Edition">
                <Link to="/EditProfile"><button className="Edition-button">Edycja Profilu</button></Link>
                <Link to="/Watched"><button className="Edition-button">Obserwowani</button></Link>
                <Link to="/Followers"><button className="Edition-button">Obserwujący</button></Link>
                <button className="Edition-button">Wyloguj</button>
            </div>
        </div>
    );
}

export default YourProfile;