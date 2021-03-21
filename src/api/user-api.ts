import { HTTP } from '../utils/http/index.js'
import { BASE_API_URL } from '../constants.js'

import { BaseAPI } from './base-api.js'

const USER_URL = '/auth/user'
const USER_PROFILE_URL = '/user/profile'
const USER_PASSWORD_URL = '/user/password'
const USER_AVATAR_URL = '/user/profile/avatar'

const userAPIInstance = new HTTP(BASE_API_URL)

export class UserAPI extends BaseAPI {
    async request() {
        try {
            const { response } = await userAPIInstance.get(USER_URL, {
                withCredentials: true
            })

            return JSON.parse(response)
        } catch (error) {
            throw error
        }
    }

    async updatePersonalData(data: any) {
        try {
            const { response } = await userAPIInstance.put(USER_PROFILE_URL, {
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

    async updatePassword(data: any) {
        try {
            const { response } = await userAPIInstance.put(USER_PASSWORD_URL, {
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

    async uploadAvatar(data: any) {
        try {
            const { response } = await userAPIInstance.put(USER_AVATAR_URL, {
                withCredentials: true,
                data: new FormData(data)
            })

            return JSON.parse(response)
        } catch (error) {
            throw error
        }
    }
}
