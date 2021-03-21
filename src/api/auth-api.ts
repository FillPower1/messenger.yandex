import { HTTP } from '../utils/http/index.js'
import { BASE_API_URL } from '../constants.js'

import { BaseAPI } from './base-api.js'

const REGISTER_URL = '/auth/signup'
const LOGIN_URL = '/auth/signin'
const LOGOUT_URL = '/auth/logout'

const authAPIInstance = new HTTP(BASE_API_URL)

export class AuthAPI extends BaseAPI {
    async create(data: any) {
        try {
            const { response } = await authAPIInstance.post(REGISTER_URL, {
                withCredentials: true,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return JSON.parse(response)
        } catch (error) {
            throw error
        }
    }

    async request(data: any) {
        try {
            const { response } = await authAPIInstance.post(LOGIN_URL, {
                withCredentials: true,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            const { response } = await authAPIInstance.post(LOGOUT_URL, {
                withCredentials: true
            })

            return response
        } catch (error) {
            throw error
        }
    }
}
