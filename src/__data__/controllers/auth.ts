import { AuthAPI, LoginForm, RegisterForm } from '../../api/auth-api'
import { Routes, SUCCESS_STATUS } from '../../constants'
import { Block } from '../../core/block'
import { Router } from '../../core/router'
import { Events } from '../../core/block/types'
import { State } from '../state'

const authAPIInstance = new AuthAPI()
const state = new State()

export class AuthController {
    static Page: Block

    static subscribe(Page: Block): void {
        AuthController.Page = Page
    }

    static signIn(formData: LoginForm, form: HTMLFormElement): void {
        authAPIInstance
            .request(formData)
            .then((response) => {
                if (response === SUCCESS_STATUS) {
                    state.set('auth', {
                        isAuthorized: true,
                        textError: ''
                    })

                    // кладу в localStorage данные об авторизации т.к у нас нет доступа к кукам
                    // и чекаем при каждом входе его авторизацию в сторадже, если пользователь вышел, то стор очищается
                    localStorage.setItem('auth', JSON.stringify(state.get('auth')))

                    new Router().go(Routes.Main)
                    form.reset()
                } else {
                    localStorage.removeItem('auth')
                    state.set('auth', {
                        isAuthorized: false,
                        textError: JSON.parse(response)?.reason,
                        inputs: formData
                    })

                    AuthController.Page.eventBus.emit(Events.FLOW_RENDER)
                }
            })
            .catch((err) => {
                console.error(err)
                localStorage.removeItem('auth')
                state.set('auth', {
                    isAuthorized: false,
                    textError: 'Что-то пошло не так',
                    inputs: formData
                })

                AuthController.Page.eventBus.emit(Events.FLOW_RENDER)
            })
    }

    static signUp(formData: RegisterForm, form: HTMLFormElement): void {
        authAPIInstance
            .create(formData)
            .then((response) => {
                if (response?.reason) {
                    state.set('auth', {
                        textError: response?.reason,
                        inputs: formData
                    })

                    localStorage.removeItem('auth')
                    AuthController.Page.eventBus.emit(Events.FLOW_RENDER)
                    return
                }

                state.set('auth', {
                    isAuthorized: true,
                    textError: ''
                })

                localStorage.setItem('auth', JSON.stringify(state.get('auth')))
                new Router().go(Routes.Main)
                form.reset()
            })
            .catch((err) => {
                console.error(err)
                localStorage.removeItem('auth')
                state.set('auth', {
                    isAuthorized: false,
                    textError: 'Что-то пошло не так',
                    inputs: formData
                })

                AuthController.Page.eventBus.emit(Events.FLOW_RENDER)
            })
    }

    static async logout(): Promise<void> {
        authAPIInstance
            .logout()
            .then(() => {
                state.set('auth.isAuthorized', false)
                state.set('activeChat', {})

                localStorage.removeItem('auth')
                new Router().go(Routes.Login)
            })
            .catch((err) => {
                localStorage.removeItem('auth')
                console.error(err)
            })
    }
}
