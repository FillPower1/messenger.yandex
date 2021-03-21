import { UserAPI } from '../../api/user-api.js'
import { SUCCESS_STATUS } from '../../constants.js'
import * as types from '../action-types.js'

const userAPI = new UserAPI()

export const getPersonalData = () => (dispatch: any) => {
    userAPI.request()
        .then((data) => {
            dispatch({
                type: types.FETCH_PERSONAL_DATA_SUCCESS,
                payload: data || {}
            })
        })
        .catch((err) => {
            console.error(err)
            dispatch({
                type: types.FETCH_PERSONAL_DATA_ERROR
            })
        })
}

export const editPersonalData = (data: any) => (dispatch: any) => {
    userAPI.updatePersonalData(data)
        .then((response) => {
            dispatch({
                type: types.FETCH_PERSONAL_DATA_SUCCESS,
                payload: response || {}
            })
        })
        .catch((err) => {
            console.error(err)
        })
}

export const changePassword = (data: any) => (dispatch: any) => {
    userAPI.updatePassword(data)
        .then((response) => {
            if (response === SUCCESS_STATUS) {
                dispatch({
                    type: types.CHANGE_PASSWORD_SUCCESS
                })
            } else {
                dispatch({
                    type: types.CHANGE_PASSWORD_ERROR,
                    payload: response || ''
                })
            }
        })
        .catch((err) => {
            console.error(err)
            dispatch({
                type: types.CHANGE_PASSWORD_ERROR
            })
        })
}

export const resetPasswordStatus = () => (dispatch: any) => {
    dispatch({
        type: types.RESET_CHANGE_PASSWORD_STATUS
    })
}

export const updateAvatar = (formData: any) => (dispatch: any) => {
    userAPI.uploadAvatar(formData)
        .then((response) => {
            dispatch({
                type: types.FETCH_PERSONAL_DATA_SUCCESS,
                payload: response || {}
            })
        })
        .catch((err) => {
            console.error(err)
        })
}
