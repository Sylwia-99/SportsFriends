import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Api} from "../../apiHandler/apiHandler";
const AddActivity = props =>{
    const {register, handleSubmit, formState:{ errors }} = useForm();
    const [errorMessage,setErrorMessage] = useState('');

    const onSubmit = formData => {
        Api.addUserActivity(formData.addActivity).then( response =>{
            if(response.status === 200){
                alert('Dodano aktywność');
            }
        }).then(function (response) {
            console.log(response);
        }).catch( (error) =>{
            if(error.response){
                setErrorMessage(error.response.data.detail);
            }
        });
    }

    return (
        <div className="Add-activities">
            <h3>Dodaj aktywność</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage==='' ?
                    null
                    :
                    <p className="Messages">{errorMessage}</p>
                }
                <select
                    name="addActivity"
                    {...register("addActivity")}
                >
                    <option value="Bieganie">Bieganie</option>
                    <option value="Rower">Rower</option>
                    <option value="Pływanie">Pływanie</option>
                    <option value="Piłka nożna">Piłka nożna</option>
                    <option value="Siłownia">Siłownia</option>
                </select>
                {errors?.addActivity && <span className="error">{errors.addActivity.message}</span>}
                <button className="Save-button" type="submit">Dodaj</button>
            </form>
        </div>
    )
}

export default AddActivity;