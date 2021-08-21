import React from 'react'
import Modal from "react-modal";

const MyModal =  (props) =>{

    return (
        <Modal
            isOpen={props.isOpen}
            contentLabel="My dialog"
            className="Mymodal"
            ariaHideApp={false}
            overlayClassName="Myoverlay"
            closeTimeoutMS={500}
        >
            <div>{props.message}</div>
            <button className="Modal-button" onClick={props.onClick}>Ok</button>
        </Modal>
    )
}

export default MyModal;