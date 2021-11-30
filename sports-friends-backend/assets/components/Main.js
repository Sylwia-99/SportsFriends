import React from 'react';
import '../styles/Main.css';
import User from "./User";

const Main = (props) =>{
    return(
        <main>
            {
                props.noUsers ?
                    <div className="no-users">
                        <h1 className="no-users__information">Brak użytkowników</h1>
                    </div>
                    :
                    <section>
                        {props.users.map((user, i) =>{
                            {user.avatar}
                                return(<User
                                    key={i}
                                    id={user.id}
                                    avatar={user.avatar}
                                    name={user.name}
                                    surname={user.surname}
                                    email={user.email}
                                    city={user.city}
                                    street={user.street}
                                    activities={user.activities}
                                    removed={false}
                                    className="avatar"
                                    classNameSpan="main"
                                    classNameImg="avatar-image"
                                />)
                            }
                        )}
                    </section>
            }

        </main>
    )

}

export default Main;
