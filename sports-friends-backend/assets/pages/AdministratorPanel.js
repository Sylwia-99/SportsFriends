import React from 'react';
import AdministratorPanelComponent from "../components/adminPanel/AdministratorPanelComponent";
const AdministratorPanel = (props) => {
    return (
        <>
            <AdministratorPanelComponent {...props} user = {props.user} avatar = {props.avatar} users = {props.users}/>
        </>
    )
}
export default AdministratorPanel;