import React from 'react';
import Header from '../components/Header';
import './EditProfile.css';

function EditProfile() {
    return (
        <div className="App">
            <Header/>
            <div className="Edit-information">
                <div className="Edit-image">
                    <h3>Edytuj zdjęcie profilowe</h3>
                    <form>
                        <img className="Big-avatar" src="images/avatar.jpg"></img>
                        <button className="Edit-image-button" type="submit">Zmien zdjęcie profilowe</button>
                    </form>
                </div>
                <div className="Edit-name-surname">
                    <h3>Edytuj Imię i Nazwisko</h3>
                    <h2>Imie Nazwisko</h2>
                    <form>
                        <input placeholder="Imie"></input>
                        <input placeholder="Nazwisko"></input>
                        <button className="Save-button" type="submit">Zapisz</button>
                    </form>
                </div>
                <div className="Edit-password">
                    <h3>Zmień hasło</h3>
                    <form>
                        <input name="password" placeholder="Obecne Hasło" type="text"></input>
                        <input name="password" placeholder="Hasło" type="text"></input>
                        <input name="confirmPassword" placeholder="Powtórz Hasło" type="text"></input>
                        <button className="Save-button" type="submit">Zapisz</button>
                    </form>
                </div>
                <div className="Remove-activities">
                    <h3>Usuń aktywność</h3>
                    <form>
                        <select>
                            <option>Bieganie</option>
                            <option>Rower</option>
                            <option>Pływanie</option>
                            <option>Piłka nożna</option>
                            <option>Siłownia</option>
                        </select>
                        <button className="Save-button" type="submit">Usuń</button>
                    </form>
                </div>
                <div className="Add-activities">
                    <h3>Dodaj aktywność</h3>
                    <form>
                        <select>
                            <option>Bieganie</option>
                            <option>Rower</option>
                            <option>Pływanie</option>
                            <option>Piłka nożna</option>
                            <option>Siłownia</option>
                        </select>
                        <button className="Save-button" type="submit">Dodaj</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;