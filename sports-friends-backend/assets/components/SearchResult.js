import React from 'react';
import '../styles/Header.css';
import {Link} from "react-router-dom";
import '../styles/Search.css';

const SearchResult = props =>{
    const {users, err, value} = props.users;
    let content = null;

    if(!err && users){
        content = (
            <div className="Result-content">
                {users.map(user =>
                    <Link to={`/profile/${user.id}`} className="Search-result">
                        <img className="avatar-image-search" src={user.avatar} alt={"this is avatar image"}/>
                        <h3>{user.name} {user.surname}</h3>
                    </Link>
                )}
            </div>
        )
    }

    return (
        <div className="Result">
            {err ? `Nie znaleziono użytkownika:${value}` : content}
        </div>
    );
}

export default SearchResult;