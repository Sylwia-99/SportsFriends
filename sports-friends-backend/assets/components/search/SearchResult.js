import React from 'react';
import '../../styles/Header.css';
import '../../styles/Search.css';
import User from "../User";

const SearchResult = props =>{
    const {users, err, value} = props.users;
    let content = null;

    if(!err && users){
        content = (
            <div className="Result-content">
                {users.map((user, i) =>
                    <User
                        key={i}
                        id={user.id}
                        avatar={user.avatar}
                        name={user.name}
                        surname={user.surname}
                        className="Search-result"
                        classNameSpan="search"
                        classNameImg="avatar-image-search"
                    />
                )}
            </div>
        )
    }

    return (
        <div
            className="Result">
            {err ? `Nie znaleziono użytkownika:${value}` : content}
        </div>
    );
}

export default SearchResult;