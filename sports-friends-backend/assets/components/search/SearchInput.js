import React from 'react';
import '../../styles/Header.css';
import { FiSearch } from 'react-icons/fi';

const SearchInput = props =>{
    return (
        <form className="search">
            <input
                className="search-input"
                placeholder="Szukaj"
                value={props.value}
                onChange={props.change}
            />
            <button className="search-button" type="button" onClick={props.submit}><FiSearch/></button>
        </form>
    )
}

export default SearchInput;