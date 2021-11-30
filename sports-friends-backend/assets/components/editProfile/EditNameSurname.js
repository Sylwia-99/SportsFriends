import React, {useEffect, useState} from 'react';
import {Api} from "../../apiHandler/apiHandler";
import {useForm} from "react-hook-form";
import MyModal from "../MyModal";

const EditNameSurname = props =>{
    const {register, handleSubmit, formState:{ errors }, reset } = useForm();
    const [errorMessage,setErrorMessage] = useState('');
    const [userChange, setUserChange] = useState({name: '', surname: ''});
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = formData => {
        Api.changeNameSurname(formData.name, formData.surname)
            .then( response =>{
                if(response.status === 200){

                }
            }).catch( (error) =>{
            if(error.response){
                setErrorMessage(error.response.data.detail);
            }
        }).then(()=>{
            if (errorMessage === '') {
                setMessage("Imię i nazwisko zostały zmienione");
                setIsOpen(!isOpen);
                setUserChange({name: formData.name, surname: formData.surname});
                reset({name:''});
            }
        });
    }

    return (
        <div className="Edit-name-surname">
            <MyModal isOpen={isOpen} onClick={()=>setIsOpen(!isOpen)} message={message}/>
            <h3>Edytuj Imię i Nazwisko</h3>
            {(userChange?.name || userChange?.surname) && <h2 id="name">{userChange.name} {userChange.surname}</h2> }
            {!userChange?.name && <h2 id="name">{props.name} {props.surname}</h2> }
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Imię"
                    name="name"
                    {...register("name",{
                        pattern:{
                            value: /[A-Zaz]/,
                            message: 'Imię może zawierać tylko małe i duże litery'
                        },
                        maxLength:{
                            value:20,
                            message: 'Imię nie może zawierać więcej niż 20 znaków'
                        },
                        required: "To pole jest wymagane"
                    })}
                />
                {errors?.name && <span className="error">{errors.name.message}</span>}
                <input
                    placeholder="Nazwisko"
                    name="surname"
                    {...register("surname",{
                        pattern:{
                            value: /[A-Zaz]/,
                            message: 'Nazwisko może zawierać tylko małe i duże litery'
                        },
                        maxLength:{
                            value:20,
                            message: 'Nazwisko nie może zawierać więcej niż 20 znaków'
                        },
                        required: "To pole jest wymagane"
                    })}
                />
                {errors?.surname && <span className="error">{errors.surname.message}</span>}
                <button className="Save-button" type="submit">Zapisz</button>
            </form>
        </div>
    )
}

export default EditNameSurname;