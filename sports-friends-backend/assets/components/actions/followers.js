import {GET_WATCHERS, GET_FOLLOWERS} from "../constants/actionTypes";
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