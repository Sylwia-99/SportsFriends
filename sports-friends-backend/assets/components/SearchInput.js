import React from 'react';
import '../styles/Header.css';
import { FiSearch } from 'react-icons/fi';

const SearchInput = props =>{
    return (
        <form className="search" onSubmit={props.submit}>
            <input
                className="search-input"
                placeholder="Szukaj"
                value={props.value}
                onChange={props.change}
            />
            <button className="search-button"><FiSearch/></button>
        </form>
    )
}

export default SearchInput;