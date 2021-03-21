import { Block } from '../../../core/block/index.js'
import { renderChild } from '../../../utils/render.js'
import { Form } from '../form/index.js'

import { validationScheme } from './validate-scheme.js'
import { Validate } from '../../../utils/validate.js'
import { getFormData } from '../get-form-data.js'
import { dispatch } from '../../../__data__/store.js'
import { signIn } from '../../../__data__/actions/auth.js'
import Router from '../../../core/router/router.js'
import { getIsAuthorized } from '../../../__data__/selectors/auth.js'
import { Routes } from '../../../constants.js'

const formItems = [
    {
        name: 'login',
        placeholder: 'Логин',
        type: 'text'
    },
    {
        name: 'password',
        placeholder: 'Пароль',
        type: 'password'
    }
]

export class Login extends Block {
    private static className = 'wrapper'

    constructor() {
        super('div', {
            className: Login.className,
            components: [
                new Form({
                    title: 'Вход',
                    text: 'Авторизоваться',
                    href: '#register',
                    link: 'Нет аккаунта?',
                    items: formItems,
                    onSubmit: (event: { preventDefault: () => void; target: HTMLFormElement }) => {
                        event.preventDefault()
                        const instance = new Validate(event.target, validationScheme)
                        const isValid = instance.validateOnSubmit()

                        if (!isValid) {
                            return
                        }

                        const loginData = getFormData(formItems, event.target)
                        dispatch(signIn(loginData))
                    },
                    validationScheme
                })
            ]
        })
    }

    componentDidMount(): void {
        this.connectToStore(this)
    }

    mapStateToProps(store: any) {
        const isAuthorized = getIsAuthorized(store)

        return { isAuthorized }
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }

    render() {
        if (this.props?.isAuthorized) {
            new Router().go(Routes.main)
            this.hide()
        }

        return ''
    }
}
