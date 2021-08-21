import React, {useState} from 'react';
import {Api} from "../../apiHandler/apiHandler";
import {useForm} from "react-hook-form";
import MyModal from "../MyModal";

const EditPassword = props =>{
    const {register, handleSubmit, formState:{ errors }, reset} = useForm();
    const [errorMessage,setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = formData =>{
       Api.changePassword(formData.currentPassword, formData.password, formData.confirmedPassword).then( response =>{
           if(response.status === 200){
               setIsOpen(!isOpen);
               reset({name:''});
           }
       }).catch( (error) =>{
           if(error.response){
               setErrorMessage(error.response.data.detail);
           }
       });
    }

    return (
        <div className="Edit-password">
            <MyModal isOpen={isOpen} onClick={()=>setIsOpen(!isOpen)} message={"Hasło zostało zmienione"}/>
            <h3>Zmień hasło</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage==='' ?
                    null
                    :
                    <p className="Messages">{errorMessage}</p>
                }
                <input
                    name="currentPassword"
                    placeholder="Obecne Hasło"
                    type="password"
                    {...register("currentPassword",{
                        required: "To pole jest wymagane"
                    })}
                />
                {errors?.currentPassword && <span className="error">{errors.currentPassword.message}</span>}
                <input
                    name="password"
                    placeholder="Nowe Hasło"
                    type="password"
                    {...register("password", {
                        pattern:{
                            value: /^((?=.*\d)|(?=.*[a-z])|(?=.*[A-Z])).{8,}$/,
                            message: 'Hasło musi zawierać:Małe i Duże litery, liczby i minimum 8 znaków'
                        },
                        required: "To pole jest wymagane"
                    })}
                />
                {errors?.password && <span className="error">{errors.password.message}</span>}
                <input
                    name="confirmedPassword"
                    placeholder="Powtórz Hasło"
                    type="password"
                    {...register("confirmedPassword",{
                        required:  "To pole jest wymagane"
                    })}
                />
                {errors?.confirmedPassword && <span className="error">{errors.confirmedPassword.message}</span>}
                <button className="Save-button" type="submit">Zapisz</button>
            </form>
        </div>
    )
}

export default EditPassword;