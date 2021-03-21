import { Action } from '../../core/redux/types'
import * as types from '../action-types.js'

const initialState = {
    isLoading: false,
    hasError: false,
    avatar: null,
    first_name: '',
    second_name: '',
    display_name: '',
    email: '',
    login: '',
    phone: '',
    passwordChangeStatus: false,
    errorText: ''
}

type State = typeof initialState

export function personalData(state: State = initialState, action: Action) {
    switch (action.type) {
        case types.FETCH_PERSONAL_DATA_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case types.FETCH_PERSONAL_DATA_ERROR: {
            return {
                ...state,
                hasError: true,
                errorText: action.payload
            }
        }
        case types.CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                passwordChangeStatus: true,
            }
        }
        case types.CHANGE_PASSWORD_ERROR: {
            return {
                ...state,
                passwordChangeStatus: false,
                errorText: action.payload
            }
        }
        case types.RESET_CHANGE_PASSWORD_STATUS: {
            return {
                ...state,
                passwordChangeStatus: false,
                errorText: ''
            }
        }
    }

    return state
}
