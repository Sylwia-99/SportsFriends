import React, {useEffect, useState} from 'react'

const Message =  (props) =>{
    const[avatar, setAvatar] = useState('');

    useEffect(() =>{
        import(`../../../src/uploads/${props.avatar}`)
            .then(({default: url}) =>{
                    setAvatar( url);
                }
            )
    },[]);

    return (
        <ul className="Rec-messages-list">
            <li key={props.key}>
                <div className="One-friend" onClick={props.onClick}>
                    <img className="Medium-avatar" src={avatar}/>
                    <h4>{props.name} {props.surname}</h4>
                </div>
                <p>{props.contents}</p>
            </li>
        </ul>
    )
}

export default Message;