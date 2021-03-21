import { AuthAPI } from '../../api/auth-api.js'
import * as types from '../action-types.js'
import { Router } from '../../core/router/index.js'
import { SUCCESS_STATUS } from '../../constants.js'

const AUTH = 'auth'
const authAPIInstance = new AuthAPI()

export const authErrorsReset = () => (dispatch: any) => {
    dispatch({
        type: types.AUTH_RESET
    })
}

export const signIn = (formData: any) => (dispatch: any, getState: any) => {
    authAPIInstance.request(formData)
        .then((response) => {
            if (response === SUCCESS_STATUS) {
                dispatch({
                    type: types.AUTH_SUCCESS
                })

                localStorage.setItem(AUTH, JSON.stringify(getState().auth))
            } else {
                localStorage.removeItem(AUTH)
                dispatch({
                    type: types.AUTH_ERROR,
                    payload: JSON.parse(response)?.reason
                })
            }
        })
        .catch((err) => {
            localStorage.removeItem(AUTH)
            console.error(err)
            dispatch({
                type: types.AUTH_ERROR
            })
        })
}

export const signUp = (formData: any) => (dispatch: any, getState: any) => {
    authAPIInstance.create(formData)
        .then((response) => {
            if (response?.reason) {
                dispatch({
                    type: types.AUTH_ERROR,
                    payload: response?.reason
                })

                localStorage.removeItem(AUTH)
                return
            }

            dispatch({
                type: types.AUTH_SUCCESS
            })

            localStorage.setItem(AUTH, JSON.stringify(getState().auth))
        })
        .catch((err) => {
            localStorage.removeItem(AUTH)
            console.error(err)
            dispatch({
                type: types.AUTH_ERROR
            })
        })
}

export const logout = () => (dispatch: any) => {
    return authAPIInstance.logout()
        .then(() => {
            localStorage.removeItem(AUTH)
            dispatch({
                type: types.AUTH_LOGOUT_SUCCESS
            })

            new Router().go('#login')
        })
        .catch((err) => {
            localStorage.removeItem(AUTH)
            console.error(err)
        })
}
