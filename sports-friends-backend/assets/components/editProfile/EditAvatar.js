import React, {useState} from 'react';
import {Api} from "../../apiHandler/apiHandler";
import {useForm} from "react-hook-form";
import MyModal from "../MyModal";
const EditAvatar = props =>{
    const { handleSubmit } = useForm();

    const [selectedFile, setSelectedFile] = useState();
    const [errorMessage,setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('avatar', selectedFile);
        Api.changeAvatar(fd).then( response =>{
            if(response.status === 200) {
                setIsOpen(!isOpen);
                setMessage("Pomyślnie dodano zdjęcie")
            }
        }).then(function (response) {
            console.log(response);
        }).catch( (error) =>{
            if(error.response){
                setIsOpen(!isOpen);
                setMessage("Nie udało się dodać zdjęcia. Spróbuj jeszcze raz")
                setErrorMessage(error.response.data.detail);
            }
        });
    }

    const clickOk  = () => {
        setIsOpen(!isOpen);
        location.href = '/yourProfile';
    }

    return (
        <div className="Edit-image">
            <MyModal isOpen={isOpen} onClick={()=>clickOk()} message={message}/>
            <h3>Edytuj zdjęcie profilowe</h3>
            <form onSubmit={handleSubmit(fileUploadHandler)}>
                {errorMessage==='' ?
                    null
                    :
                    <p className="Messages">{errorMessage}</p>
                }
                <span className="big">
                    <img className="Big-avatar" src={props.avatar} alt={"this is avatar image"}/>
                </span>
                <div className="Edit-image-buttons">
                    <input
                        className="choose-file-button"
                        type="file"
                        onChange={fileSelectedHandler}
                    />
                    <button
                        className="Edit-image-button"
                        type="submit"
                    >
                        Zmień zdjęcie profilowe
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditAvatar;