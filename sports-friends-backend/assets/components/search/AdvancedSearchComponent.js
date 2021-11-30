import React, {useCallback, useState} from 'react';
import Header from '../Header';
import Main from "../Main";
import Filters from "./Filters";
import {Api} from "../../apiHandler/apiHandler";

const AdvancedSearchComponent = (props) =>{
    const [filters, setFilters] = useState('');
    const [searchUsers, setSearchUsers] = useState(props.users);
    const [noUsers, setNoUsers] = useState(props.noUsers);

    const wrapperSetFilters = useCallback(val => {
        setFilters(val);
        Api.search(val).then( response =>{
            if(response.status === 200){
                if(response.data.length === 0){
                    setNoUsers( true);
                }
                else{
                    setNoUsers( false);
                    console.log(response.data);
                    setSearchUsers(response.data);
                }
            }
        }).catch( (error) => {
            if(error.response){
                if(error.response){
                    console.log(error.response.data.detail);
                }
            }
        });
    }, [setFilters]);
    return (
        <div className="App">
            <Header {...props} user = {props.user} avatar = {props.avatar}/>
                <div>
                    <Filters filters={filters} filtersStateSetter={wrapperSetFilters}/>
                </div>
            <Main {...props} users = {searchUsers} noUsers = {noUsers}/>
        </div>
    );
}

export default AdvancedSearchComponent;