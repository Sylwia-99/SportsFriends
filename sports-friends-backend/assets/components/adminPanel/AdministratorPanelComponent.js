import React from 'react';
import '../../styles/PanelAdmin.css';
import Header from '../Header';
import User from "../User";

const AdministratorPanelComponent = (props) =>{
    return (
        <div className="App">
            <Header {...props} user = {props.user} avatar = {props.avatar}/>
            <main>
                <section className="all-users">
                    <h2>Użytkownicy</h2>
                    {   props.users.length!==0 ?
                        props.users.map((user, index) => {
                            return (<User
                                key={index}
                                id={user.id}
                                avatar={user.avatar}
                                name={user.name}
                                surname={user.surname}
                                className="user-information"
                                classNameSpan="medium"
                                classNameImg="Medium-avatar"
                                removed={true}
                            />)
                        }) :
                        <h4>Nie ma żadnego użytkownika</h4>
                    }
                </section>
            </main>
        </div>
    );


}

export default AdministratorPanelComponent;