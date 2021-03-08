import { Block } from '../../../core/block/index.js'
import { Validate } from '../../../utils/validate.js'

import { Form } from '../form/index.js'
import { validationScheme } from './validate-scheme.js'
import { render, renderChild } from '../../../utils/render.js'

export class Register extends Block {
    private static className = 'wrapper'

    constructor(props = {}) {
        super('div', {
            ...props,
            className: Register.className
        })
    }

    componentDidMount(oldProps: {} = {}): void {
        this.setProps({
            components: [
                new Form({
                    title: 'Регистрация',
                    buttons: {
                        text: 'Зарегистрироваться',
                        href: './login.html',
                        link: 'Войти'
                    },
                    items: [
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
                    ],
                    onSubmit: this.onSubmit,
                    validationScheme
                })
            ]
        })
    }

    onSubmit(event: { preventDefault: () => void; target: HTMLFormElement }) {
        event.preventDefault()
        const instance = new Validate(event.target, validationScheme)
        const isValid = instance.validateOnSubmit()

        if (!isValid) {
            return
        }
    }

    componentDidRender() {
        renderChild(this.element, this.props.components)
    }
}

const page = new Register()
render('#root', page)
