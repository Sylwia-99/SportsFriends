import React, { useState} from 'react';
import {useForm} from "react-hook-form";
import {Api} from "../../apiHandler/apiHandler";
import MyModal from "../MyModal";
import storeFollowers from "../../storeFollowers";
import * as actionCreators from "../actions/followers";

const RemoveAppActivity = props =>{
    const {register, handleSubmit, formState:{ errors }} = useForm();
    const [errorMessage,setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = formData => {
        Api.removeActivity(formData.removeActivity).then( response =>{
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

    return (
        <div className="remove-activities">
            <MyModal isOpen={isOpen} onClick={()=>setIsOpen(!isOpen)} message={"Pomyślnie usunieto aktywność"}/>
            <h3>Usuń aktywność</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage==='' ?
                    null
                    :
                    <p className="Messages">{errorMessage}</p>
                }
                <select className="custom-select"
                    name="removeActivity"
                    {...register("removeActivity",{
                        required: "To pole jest wymagane"
                    })}
                >
                    {props.allActivities.map((activity) =>
                        <option key={activity.id}
                                value={activity.id}
                        >
                            {activity.name}
                        </option>
                    )}
                </select>
                <button className="save-button" type="submit">Usuń</button>
            </form>
            {errors?.removeActivity && <span className="error">{errors.removeActivity.message}</span>}
        </div>
    )
}

export default RemoveAppActivity;