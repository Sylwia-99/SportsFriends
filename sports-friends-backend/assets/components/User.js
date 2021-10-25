import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Api} from "../apiHandler/apiHandler";

const User =  (props) =>{
    const[avatar, setAvatar] = useState('');

    useEffect(() =>{
        import(`../../src/uploads/${props.avatar}`)
            .then(({default: url}) =>{
                setAvatar( url);
            }
            )
    },[]);

    return (
        <Link to={{
            pathname: `/profile/${props.id}`,
            state:
                {
                    name: props.name,
                    surname: props.surname,
                    avatar: avatar,
                    email: props.email,
                    city: props.city,
                    street: props.street,
                    activities: props.activities,
                }
        }}
              className={props.className}
        >
                        <span className={props.classNameSpan}>
                            <img className={props.classNameImg} src={avatar} alt={"this is avatar image"}/>
                        </span>
            <h3>{props.name} {props.surname}</h3>
                <div className="User-activities">
                    {
                        props.activities.map((activity, index) =>{
                           return(<h4 key={index}>{activity.name} </h4>)
                        })
                    }
                </div>
        </Link>
    )
}

export default User;