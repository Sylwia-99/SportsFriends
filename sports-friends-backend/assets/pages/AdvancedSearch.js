import React from 'react';
import AdvancedSearchComponent from "../components/search/AdvancedSearchComponent";
const AdvancedSearch = (props) => {
    return (
        <>
            <AdvancedSearchComponent {...props} user = {props.user} avatar = {props.avatar}/>
        </>
    )
}

export default AdvancedSearch;