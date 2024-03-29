import {
    ADD_MESSAGE,
    GET_CONVERSATIONS,
    SET_HUBURL,
    SET_LAST_MESSAGE,
    GET_MESSAGES,
    SET_EMAIL
} from "../components/constants/actionTypes";

export default (
    state = {
        items:[],
        hubUrl: null,
        email: null
    },
        action

) => {
    switch (action.type){
        case GET_CONVERSATIONS:
            return {
                ...state,
                items: action.items
            }
        case GET_MESSAGES:
            const _newConversations = state.items.map(conversation => {
                return conversation.conversationId.toString() === action.conversationId.toString()
                    ? Object.assign({}, conversation, {messages: action.messages})
                    : conversation
                ;
            })
            return {
                ...state,
                items: _newConversations
            }
        case SET_LAST_MESSAGE:
            const _newConversationsWithLastMessage = state.items.map(conversation => {
                return conversation.conversationId.toString() === action.conversationId.toString()
                    ?
                    (
                        conversation.content = action.message.content,
                        conversation.createdAt = action.message.createdAt,
                        Object.assign({}, conversation)
                    )
                    : Object.assign({}, conversation);
            })
            return {
                ...state,
                items: [..._newConversationsWithLastMessage]
            }
        case ADD_MESSAGE:
            const _newConversationsWithNewMessage = state.items.map(conversation => {
                return conversation.conversationId.toString() === action.conversationId.toString()
                    ? Object.assign({}, conversation, {messages: [...conversation.messages, action.message]})
                    : Object.assign({}, conversation)
                    ;
            })
            return {
                ...state,
                items: [..._newConversationsWithNewMessage]
            }
        case SET_HUBURL:
            return {
                ...state,
                hubUrl: action.hubUrl
            }
        case SET_EMAIL:
            return {
                ...state,
                email: action.email
            }
        default:
            return state;
    }
}