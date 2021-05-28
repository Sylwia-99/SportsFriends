import React, {useState} from 'react';
import {Api} from "../../apiHandler/apiHandler";
import {useForm} from "react-hook-form";

const EditNameSurname = props =>{
    const {register, handleSubmit, formState:{ errors }} = useForm();
    const [errorMessage,setErrorMessage] = useState('');

    const onSubmit = formData => {
        Api.changeNameSurname(formData.name, formData.surname)
            .then( response =>{
                if(response.status === 200){
                    console.log('Zmieniono imie, nazwisko');
                }
            }).catch( (error) =>{
            if(error.response){
                setErrorMessage(error.response.data.detail);
            }
        }).then(()=>{
            if (errorMessage === '') {
                alert('Imie i nazwisko zostało zmieniowe');
            }
        });
    }

    return (
        <div className="Edit-name-surname">
            <h3>Edytuj Imię i Nazwisko</h3>
            <h2 id="name">{props.name} {props.surname}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Imię"
                    name="name"
                    {...register("name",{
                        pattern:{
                            value: /[A-Zaz]/,
                            message: 'Imie może zawierać tylko małe i duże litery'
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