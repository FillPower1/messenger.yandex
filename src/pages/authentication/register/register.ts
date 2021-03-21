import { Block } from '../../../core/block/index.js'
import { Validate } from '../../../utils/validate.js'
import { Form } from '../form/index.js'
import { renderChild } from '../../../utils/render.js'
import { getFormData } from '../get-form-data.js'
import { signUp } from '../../../__data__/actions/auth.js'
import { dispatch } from '../../../__data__/store.js'
import { getIsAuthorized } from '../../../__data__/selectors/auth.js'
import Router from '../../../core/router/router.js'
import { Routes } from '../../../constants.js'

import { validationScheme } from './validate-scheme.js'

const formItems = [
    {
        name: 'email',
        placeholder: 'Почта',
        type: 'email'
    },
    {
        name: 'login',
        placeholder: 'Логин',
        type: 'text'
    },
    {
        name: 'first_name',
        placeholder: 'Имя',
        type: 'text'
    },
    {
        name: 'second_name',
        placeholder: 'Фамилия',
        type: 'text'
    },
    {
        name: 'phone',
        placeholder: 'Телефон',
        type: 'text'
    },
    {
        name: 'password',
        placeholder: 'Пароль',
        type: 'password'
    }
]

export class Register extends Block {
    private static className = 'wrapper'

    constructor(props = {}) {
        super('div', {
            ...props,
            className: Register.className,
            components: [
                new Form({
                    title: 'Регистрация',
                    text: 'Зарегистрироваться',
                    href: '#login',
                    link: 'Войти',
                    items: formItems,
                    onSubmit: (event: { preventDefault: () => void; target: HTMLFormElement }) => {
                        event.preventDefault()
                        const instance = new Validate(event.target, validationScheme)
                        const isValid = instance.validateOnSubmit()

                        if (!isValid) {
                            return
                        }

                        const registerData = getFormData(formItems, event.target)
                        dispatch(signUp(registerData))
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

    componentDidRender() {
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
