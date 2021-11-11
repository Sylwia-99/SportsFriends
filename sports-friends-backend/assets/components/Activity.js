import React from 'react'
import {FaRunning, FaSwimmer, FaVolleyballBall, FaBasketballBall, FaSkiing} from "react-icons/fa";
import {MdDirectionsBike} from "react-icons/md";
import {BiFootball} from "react-icons/bi";
import {CgGym} from "react-icons/cg";

const Activity =  (props) =>{

    return (
        <div key={props.id}>
            {
                props.name==="Bieganie" ? <h4><FaRunning/> Bieganie</h4> : null
            }
            {
                props.name==="Rower" ? <h4><MdDirectionsBike/> Rower</h4> : null
            }
            {
                props.name==="Pływanie" ? <h4><FaSwimmer/> Pływanie</h4> : null
            }
            {
                props.name==="Piłka nożna" ? <h4><BiFootball/> Piłka nożna</h4> : null
            }
            {
                props.name==="Siłownia" ? <h4><CgGym/> Siłownia</h4> : null
            }
            {
                props.name==="Siatkówka" ? <h4><FaVolleyballBall/> Siatkówka </h4> : null
            }
            {
                props.name==="Koszykówka" ? <h4><FaBasketballBall/> Koszykówka </h4> : null
            }
            {
                props.name==="Jazda na nartach" ? <h4><FaSkiing/> Jazda na nartach </h4> : null
            }
            {
                props.name===null ? <h4> Brak aktywności</h4> : null
            }
        </div>
    )
}

export default Activity;