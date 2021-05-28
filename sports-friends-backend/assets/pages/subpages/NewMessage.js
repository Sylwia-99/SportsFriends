import React from 'react';
import Header from "../../components/Header";
import '../../styles/NewMessage.css';
import '../../components/message/NewMessageForm'
import NewMessageForm from "../../components/message/NewMessageForm";

const NewMessage = () =>{
    return (
        <div className="App">
            <Header/>
            <NewMessageForm/>
        </div>
    )
}

export default NewMessage;