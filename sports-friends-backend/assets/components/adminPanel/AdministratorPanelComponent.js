import React from 'react';
import '../../styles/PanelAdmin.css';
import Header from '../Header';
import User from "../User";
import AddAppActivity from './AddAppActivity';
import RemoveAppActivity from './RemoveAppActivity';
import Activity from "../Activity";

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

                <section className="all-users">
                    <h2>Aktywności</h2>
                    <div className="activities">
                        {   props.allActivities.length!==0 ?
                            props.allActivities.map((activity, index) => {
                                return (<Activity
                                    key={index}
                                    id={activity.id}
                                    name={activity.name}
                                />)
                            }) :
                            <h4>Brak aktywności</h4>
                        }
                    </div>
                    <div className="edit-activities">
                        <AddAppActivity {...props} />
                        <RemoveAppActivity {...props}  allActivities = {props.allActivities}/>
                    </div>
                </section>
            </main>
        </div>
    );


}

export default AdministratorPanelComponent;