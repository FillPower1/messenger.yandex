import { HTTP } from '../utils/http/index.js'
import { BASE_API_URL } from '../constants.js'

const REGISTER_URL = '/auth/signup'
const LOGIN_URL = '/auth/signin'
const LOGOUT_URL = '/auth/logout'

const authAPIInstance = new HTTP(BASE_API_URL)

export type LoginForm = {
    login: string,
    password: string
}

export type RegisterForm = {
    emails: string,
    login: string,
    first_name: string,
    second_name: string,
    password: string
}

export class AuthAPI {
    async create(form: RegisterForm) {
        try {
            const { response } = await authAPIInstance.post(REGISTER_URL, {
                data: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return JSON.parse(response)
        } catch (error) {
            throw error
        }
    }

    async request(form: LoginForm) {
        try {
            const { response } = await authAPIInstance.post(LOGIN_URL, {
                data: JSON.stringify(form),
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
            const { response } = await authAPIInstance.post(LOGOUT_URL)

            return response
        } catch (error) {
            throw error
        }
    }
}
