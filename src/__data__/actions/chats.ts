import * as types from '../action-types.js'
import { ChatAPI } from '../../api/chat-api.js'

const chatApi = new ChatAPI()

export const getChats = () => (dispatch: any) => {
    return chatApi.request()
        .then((response) => {
            dispatch({
                type: types.FETCH_CHATS_SUCCESS,
                payload: response || []
            })

        })
        .catch((err) => {
            console.error(err)
        })
}

export const createChat = (data: any) => (dispatch: any) => {
    return chatApi.create(data)
        .then((response) => {
            dispatch({
                type: types.CREATE_CHAT_SUCCESS,
                payload: response
            })

        })
        .catch((err) => {
            console.error(err)
        })
}
