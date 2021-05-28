import React, {useEffect, useState} from 'react';
import '../styles/Main.css';
import {Api} from "../apiHandler/apiHandler";
import User from "./User";

const Main = () =>{
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        getUsers();
    }, [])

    function getUsers(){
        Api.users().then( response =>{
            if(response.status === 200){
                setUsers(response.data);
            }
        });
    }

    return(
        <main>
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
        </main>
    )

}

export default Main;
