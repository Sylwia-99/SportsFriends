import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Api} from "../../apiHandler/apiHandler";
const RemoveActivity = props =>{
    const {register, handleSubmit, formState:{ errors }} = useForm();
    const [errorMessage,setErrorMessage] = useState('');

    const onSubmit = formData => {
        Api.removeUserActivity(formData.removeActivity).then( response =>{
            if(response.status === 200){
                alert('Usunięto aktywność');
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
        <div className="Remove-activities">
            <h3>Usuń aktywność</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage==='' ?
                    null
                    :
                    <p className="Messages">{errorMessage}</p>
                }
                <select
                    name="removeActivity"
                    {...register("removeActivity",{
                        required: "To pole jest wymagane"
                    })}
                >
                    {props.activities.map((activity) =>
                        <option key={activity.id}
                                value={activity.id}
                        >
                            {activity.name}
                        </option>
                    )}
                </select>
                <button className="Save-button" type="submit">Usuń</button>
            </form>
            {errors?.removeActivity && <span className="error">{errors.removeActivity.message}</span>}
        </div>
    )
}

export default RemoveActivity;