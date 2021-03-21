import { Action } from '../../core/redux/types'
import * as types from '../action-types.js'

const initialState = {
    isAuthorized: false,
    hasError: false,
    textError: '',
    isLoading: false
}

type State = typeof initialState

export function auth(state: State = initialState, action: Action) {
    switch (action.type) {
        case types.AUTH_INIT: {
            return {
                ...state,
                ...action.payload
            }
        }
        case types.AUTH_SUCCESS: {
            return {
                ...state,
                isAuthorized: true,
                isLoading: false,
                textError: ''
            }
        }
        case types.AUTH_ERROR: {
            return {
                ...state,
                hasError: true,
                textError: action.payload,
                isLoading: false
            }
        }
        case types.AUTH_RESET: {
            return {
                ...state,
                textError: '',
                hasError: false
            }
        }
        case types.AUTH_LOGOUT_SUCCESS: {
            return {
                ...state,
                isAuthorized: false
            }
        }
    }

    return state
}
