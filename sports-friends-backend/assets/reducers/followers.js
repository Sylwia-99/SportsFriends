import {
    GET_FOLLOWERS,
    GET_WATCHERS,
    GET_USERS,
    SET_NO_USERS, SET_ALL_ACTIVITIES
} from "../components/constants/actionTypes";

export default (
    state = {
        watchers:[],
        users: [],
        allActivities: false
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
        case GET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_NO_USERS:
            return{
                ...state,
                noUsers: action.users
            }
        case SET_ALL_ACTIVITIES:
            return{
                ...state,
                allActivities: action.allActivities
            }
        default:
            return state;
    }
}