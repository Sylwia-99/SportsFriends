import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Api} from "../../apiHandler/apiHandler";
import MyModal from "../MyModal";
import storeFollowers from "../../storeFollowers";
import * as actionCreators from "../actions/followers";

const AddAppActivity = props =>{
    const {register, handleSubmit, formState:{ errors }} = useForm();
    const [errorMessage,setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = formData => {
        Api.addActivity(formData.name).then( response =>{
            if(response.status === 200){
                setIsOpen(!isOpen);
                storeFollowers.dispatch(actionCreators.fetchAllActivities());
            }
        }).then(function (response) {
            console.log(response);
        }).catch( (error) =>{
            if(error.response){
                setErrorMessage(error.response.data.detail);
            }
        });
    }

    const clickOk  = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="add-activities">
            <MyModal isOpen={isOpen} onClick={()=>clickOk()} message={"Pomyślnie dodano aktywność"}/>
            <h3>Dodaj aktywność</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage==='' ?
                    null
                    :
                    <p className="Messages">{errorMessage}</p>
                }
                <select
                    name="name"
                    {...register("name")}
                >
                    <option value="Bieganie">Bieganie</option>
                    <option value="Rower">Rower</option>
                    <option value="Pływanie">Pływanie</option>
                    <option value="Piłka nożna">Piłka nożna</option>
                    <option value="Siłownia">Siłownia</option>
                    <option value="Siatkówka">Siatkówka</option>
                    <option value="Koszykówka">Siłownia</option>
                    <option value="Jazda na nartach">Jazda na nartach</option>
                </select>
                {errors?.name && <span className="error">{errors.name.message}</span>}
                <button className="save-button" type="submit">Dodaj</button>
            </form>
        </div>
    )
}

export default AddAppActivity;