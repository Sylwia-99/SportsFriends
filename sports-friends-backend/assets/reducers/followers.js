import {
    GET_FOLLOWERS,
    GET_WATCHERS,
} from "../components/constants/actionTypes";

export default (
    state = {
        watchers:[],
    },
        action

) => {
    switch (action.type){
        case GET_WATCHERS:
            return {
                ...state,
                watchers: action.watchers
            }
        case GET_FOLLOWERS:
            return {
                ...state,
                followers: action.followers
            }
        default:
            return state;
    }
}