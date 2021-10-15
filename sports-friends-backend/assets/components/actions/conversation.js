import {ADD_MESSAGE, GET_CONVERSATIONS, SET_EMAIL, SET_HUBURL, SET_LAST_MESSAGE} from '../constants/actionTypes';
import {GET_MESSAGES} from '../constants/actionTypes';
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

/*export const fetchConversations = () => dispatch =>{
    return fetch(`/getConversations/47`)
        .then(data => data.json())
        .then( data =>{
            return dispatch(setConversations(data))
        });
}*/

export const fetchConversations = () => async (dispatch) => {
    console.log('działa');
    Api.getConversations().then( ({response}) => {
        const hubUrl = response.headers['link'].match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];
        dispatch(setHubUrl(hubUrl));
        console.log('działa', response.data);
        return dispatch(setConversations(response.data))
    });
}
   /* return fetch(`/getConversations/47`)
        .then(data => {
            const hubUrl = data.headers.get('Link').match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];

            dispatch(setHubUrl(hubUrl))
            console.log(data);
            return data.json()
        })
        .then(data => {
            console.log(data);
            return dispatch(setConversations(data))
        });
}*/

export const fetchMessages = (id) => async (dispatch) => {
    Api.getMessages(id).then(({data}) => {
        return dispatch(setMessages(data, id))
    });
}
        /*return fetch(`/messages/${id}`)
            .then(data => data.json())
            .then( data =>{
                return dispatch(setMessages(data, id))
            });
}*/

export const sendMessage = (content, id) => async (dispatch) => {
    Api.sendMessage(content, id).then(({data}) => {
        dispatch(setLastMessage(data, id));
        return dispatch(addMessage(data, id))
    });
}
    /*let formData = new FormData();
    formData.append('content', content);
    return fetch(`/newMessage/${id}`, {
        body: formData,
        method: 'POST'
    })
        .then(data => data.json())
        .then( data =>{
            dispatch(setLastMessage(data, id));
            return dispatch(addMessage(data, id))
        });
}*/