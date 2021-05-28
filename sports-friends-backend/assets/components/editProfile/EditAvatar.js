import React, {useState} from 'react';
import {Api} from "../../apiHandler/apiHandler";
const EditAvatar = props =>{
    const [selectedFile, setSelectedFile] = useState();
    const [errorMessage,setErrorMessage] = useState('');

    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('avatar', selectedFile);
        Api.changeAvatar(fd).then( response =>{
            if(response.status === 200) {
                alert('Avatar został zmieniony');
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
        <div className="Edit-image">
            <h3>Edytuj zdjęcie profilowe</h3>
            <form onSubmit={fileUploadHandler}>
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
                        type="file"
                        onChange={fileSelectedHandler}
                    />
                    <button
                        className="Edit-image-button"
                        type="submit"
                    >
                        Zmien zdjęcie profilowe
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditAvatar;