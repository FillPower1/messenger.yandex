import { Block } from '../../../core/block/index.js'
import { render, renderChild } from '../../../utils/render.js'
import { Form } from '../form/index.js'

import { validationScheme } from './validate-scheme.js'
import { Validate } from '../../../utils/validate.js'

export class Login extends Block {
    private static className = 'wrapper'

    constructor() {
        super('div', {
            className: Login.className
        })
    }

    componentDidMount(): void {
        this.setProps({
            components: [
                new Form({
                    title: 'Вход',
                    buttons: {
                        text: 'Авторизоваться',
                        href: './register.html',
                        link: 'Нет аккаунта?'
                    },
                    items: [
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
                    ],
                    onSubmit: this.onSubmit,
                    validationScheme
                })
            ]
        })
    }

    onSubmit(event: { preventDefault: () => void, target: HTMLFormElement }) {
        event.preventDefault()
        const instance = new Validate(event.target, validationScheme)
        const isValid = instance.validateOnSubmit()

        if (!isValid) {
            return
        }
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }
}

const page = new Login()
render('#root', page)
