import React, { useState} from 'react';
import {useForm} from "react-hook-form";
import {Api} from "../../apiHandler/apiHandler";
import MyModal from "../MyModal";
const RemoveActivity = props =>{
    const {register, handleSubmit, formState:{ errors }} = useForm();
    const [errorMessage,setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = formData => {
        Api.removeUserActivity(formData.removeActivity).then( response =>{
            if(response.status === 200){
                setIsOpen(!isOpen);
                setMessage("Pomyślnie usunięto aktywność")
            }
        }).then(function (response) {
            console.log(response);
        }).catch( (error) =>{
            if(error.response){
                setIsOpen(!isOpen);
                setMessage("Nie udało się usunąć aktywności. Spróbuj jeszcze raz")
                setErrorMessage(error.response.data.detail);
            }
        });
    }

    const clickOk  = () => {
        setIsOpen(!isOpen);
        location.href = '/yourProfile';
    }

    return (
        <div className="Remove-activities">
            <MyModal isOpen={isOpen} onClick={()=>clickOk()} message={message}/>
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