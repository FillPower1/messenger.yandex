import { HTTP } from '../utils/http/index.js'
import { BASE_API_URL } from '../constants.js'

const USER_URL = '/auth/user'
const USER_PROFILE_URL = '/user/profile'
const USER_PASSWORD_URL = '/user/password'
const USER_AVATAR_URL = '/user/profile/avatar'

const userAPIInstance = new HTTP(BASE_API_URL)

export type PersonalData = {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string
}

export type Password = {
    oldPassword: string,
    newPassword: string
}

export class UserAPI {
    async request() {
        try {
            const { response } = await userAPIInstance.get(USER_URL)

            return JSON.parse(response)
        } catch (error) {
            throw error
        }
    }

    async updatePersonalData(data: PersonalData) {
        try {
            const { response } = await userAPIInstance.put(USER_PROFILE_URL, {
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

    async updatePassword(data: Password) {
        try {
            const { response } = await userAPIInstance.put(USER_PASSWORD_URL, {
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

    async uploadAvatar(avatar: File) {
        const formData = new FormData()
        formData.append('avatar', avatar)

        try {
            const { response } = await userAPIInstance.put(USER_AVATAR_URL, {
                data: formData
            })

            return JSON.parse(response)
        } catch (error) {
            throw error
        }
    }
}
