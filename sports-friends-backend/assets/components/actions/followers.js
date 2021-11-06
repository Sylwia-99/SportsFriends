import {GET_WATCHERS, GET_FOLLOWERS, GET_USERS, SET_NO_USERS} from "../constants/actionTypes";
import {Api} from "../../apiHandler/apiHandler";

export const setWatchers = (data) =>{
    return{
        type: GET_WATCHERS,
        watchers: data
    }
}

export const setFollowers = (data) =>{
    return{
        type: GET_FOLLOWERS,
        followers: data
    }
}

export const setUsers = (data) =>{
    return{
        type: GET_USERS,
        users: data,
    }
}

export const setNoUsers = (data) =>{
    return{
        type: SET_NO_USERS,
        noUsers: data,
    }
}

export const fetchUsers = () => async (dispatch) =>{
    Api.getUsers().then( ({response}) => {
        console.log(response.data)
        if(response.data.length ===0){
            return dispatch(setNoUsers(true))
        }
        return dispatch(setUsers(response.data))
    });
}

export const fetchWatchers = () => async (dispatch) =>{
    Api.getWatchers().then( ({response}) => {
        return dispatch(setWatchers(response.data))
    });
}

export const fetchFollowers = () => async (dispatch) =>{
    Api.getFollowers().then( ({response}) => {
        return dispatch(setFollowers(response.data))
    });
}