import React from 'react';
import '../../styles/Header.css';
import '../../styles/Search.css';
import User from "../User";
import {Link} from "react-router-dom";

const SearchResult = (props) =>{
    const {users, err, value} = props.users;
    let content = null;

    if(!err && users){
        content = (
                <div className="users">
                    {users?.map((user, i) =>
                        <User
                            key={i}
                            id={user.id}
                            avatar={user.avatar}
                            name={user.name}
                            surname={user.surname}
                            city={user.city}
                            street={user.street}
                            activities={user.activities}
                            className="search-result"
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
            <div className="Result-content">
                {users.length ===0 ?
                    <div className="no-search-result">
                        <h3>Nie znaleziono użytkownika</h3>
                    </div>
                    :
                    content
                }
                <div className="link-advanced-search">
                    <Link to='/advancedSearch' className="advanced-search-button">
                        <h3>Wyszukiwanie zaawansowane</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;