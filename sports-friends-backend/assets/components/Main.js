import React, {useEffect, useState} from 'react';
import '../styles/Main.css';
import {Api} from "../apiHandler/apiHandler";
import User from "./User";

const Main = () =>{
    const [users, setUsers] = useState([]);
    const [noUsers, setNoUsers] = useState(false);

    useEffect(() =>{
        getUsers();
    }, [])

    function getUsers(){
        Api.users().then( response =>{
            if(response.status === 200){
                setUsers(response.data);
                if(response.data.length === 0){
                    setNoUsers(true)
                }
            }

        });
    }

    return(
        <main>
            {
                noUsers ?
                    <div className="no-users">
                        <h1 className="no-users__information">Brak użytkowników</h1>
                    </div>
                    :
                    <section>
                        {users.map((user, i) =>{
                                return(<User
                                    key={i}
                                    id={user.id}
                                    avatar={user.avatar}
                                    name={user.name}
                                    surname={user.surname}
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
