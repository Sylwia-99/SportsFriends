import React, {useEffect, useState} from 'react';
import {Api} from "../../apiHandler/apiHandler";
import {useForm} from "react-hook-form";
import MessageNav from "./MessageNav";

const NewMessageForm = () =>{
    const {register, handleSubmit, formState:{ errors }} = useForm();
    const [errorMessage,setErrorMessage] = useState('');

    const [watchedUsers, setWatchedUsers] = useState([]);

    useEffect(() =>{
        getWatchedUsers();
    }, [])

    function getWatchedUsers(){
        Api.watchers().then( response =>{
            if(response.status === 200){
                setWatchedUsers(response.data);
            }
        });
    }

    const onSubmit = formData => {
        Api.newMessage(formData.userRecipientId, formData.contents).then( response =>{
            console.log(formData.userRecipientId)
            if(response.status === 200){
                console.log('Wysłano wiadomość');
            }
        }).catch((error) =>{
            if(error.response){
                setErrorMessage(error.response.data.detail);
            }
        });
    }

    return (
        <div className="New-Message">
            <MessageNav/>
            <form className="Message-form" onSubmit={handleSubmit(onSubmit)}>
                {errorMessage==='' ?
                    null
                    :
                    <p className="Messages">{errorMessage}</p>
                }
                <select
                    className="Receiver"
                    name="userRecipientId"
                    {...register("userRecipientId",{
                        required: "Wybierz odbiorcę"
                    })}
                >
                    {watchedUsers.map((watchedUser) =>
                        <option key={watchedUser.id}
                                value={watchedUser.id_user_watcher}
                        >
                            {watchedUser.name} {watchedUser.surname}
                        </option>
                    )}
                </select>
                <textarea
                    className="Message-input"
                    placeholder="Wiadomość"
                    name="contents"
                    {...register("contents")}
                />
                <button className="Send" type="submit"> Wyślij wiadomość</button>
            </form>
            {errors?.userRecipientId && <span className="error">{errors.userRecipientId.message}</span>}
        </div>
    )
}

export default NewMessageForm;