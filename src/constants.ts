export const BASE_URL = 'https://ya-praktikum.tech'
export const BASE_API_URL = `${BASE_URL}/api/v2`

export const SUCCESS_STATUS = 'OK'

export enum Routes {
    Login = '/login',
    Register = '/register',
    Profile = '/profile',
    ProfileEdit = '/profile-edit',
    ProfilePasswordEdit = '/password-edit',
    NotFound = '/not-found',
    ServerError = '/server-error',
    Main = '/main'
}
