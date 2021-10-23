import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Api} from "../apiHandler/apiHandler";

const User =  (props) =>{
    const[avatar, setAvatar] = useState('');
    const[activities, setActivities] = useState([]);

    const getUserActivities = () => {
        Api.userActivities(props.id).then( response =>{
            if(response.status === 200){
                if(response.data !== []){
                    setActivities(response.data);
                }
            }
        });
    }

    useEffect(() =>{
        import(`../../src/uploads/${props.avatar}`)
            .then(({default: url}) =>{
                setAvatar( url);
            }
            )
        //getUserActivities();
    },[]);

    return (
        <Link to={`/profile/${props.id}`} className={props.className}>
                        <span className={props.classNameSpan}>
                            <img className={props.classNameImg} src={avatar} alt={"this is avatar image"}/>
                        </span>
            <h3>{props.name} {props.surname}</h3>
                <div className="User-activities">
                    {
                        //activities.map((activity, index) =>{
                        //   return(<h4 key={index}>{activity.name} </h4>)
                        //})
                    }
                </div>
        </Link>
    )
}

export default User;