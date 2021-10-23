import {ADD_MESSAGE, GET_CONVERSATIONS, GET_MESSAGES, SET_EMAIL, SET_HUBURL, SET_LAST_MESSAGE} from '../constants/actionTypes';
import {Api} from '../../apiHandler/apiHandler';

export const setConversations = (data) =>{
    return{
        type: GET_CONVERSATIONS,
        items: data
    }
}

export const setMessages = (data, id) =>{
    return{
        type: GET_MESSAGES,
        messages: data,
        conversationId: id
    }
}

export const setEmail = (email) =>{
    return{
        type: SET_EMAIL,
        email
    }
}

export const setHubUrl = (hubUrl) =>{
    return{
        type: SET_HUBURL,
        hubUrl: hubUrl
    }
}

export const setLastMessage = (data, id) =>{
    return{
        type: SET_LAST_MESSAGE,
        message: data,
        conversationId: id
    }
}

export const addMessage = (data, id) =>{
    return{
        type: ADD_MESSAGE,
        message: data,
        conversationId: id
    }
}

export const fetchConversations = () => async (dispatch) => {

    Api.getConversations().then( ({response}) => {
        const hubUrl = response.headers['link'].match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];
        dispatch(setHubUrl(hubUrl));
        return dispatch(setConversations(response.data))
    });
}

export const fetchMessages = (id) => async (dispatch) => {
    Api.getMessages(id).then(({data}) => {
        return dispatch(setMessages(data, id))
    });
}

export const sendMessage = (content, id) => async (dispatch) => {
    Api.sendMessage(content, id).then(({data}) => {
        dispatch(setLastMessage(data, id));
        return dispatch(addMessage(data, id))
    });
}