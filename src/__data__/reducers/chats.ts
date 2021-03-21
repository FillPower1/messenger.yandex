import { Action } from '../../core/redux/types'
import * as types from '../action-types.js'

const initialState = {
    chats: [],
    hasError: false
}

type State = typeof initialState

export function chats(state: State = initialState, action: Action) {
    switch (action.type) {
        case types.FETCH_CHATS_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case types.FETCH_CHATS_ERROR: {
            return {
                ...state,
                hasError: true
            }
        }
        case types.CREATE_CHAT_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
    }

    return state
}
