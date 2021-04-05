import { Block } from '../../../core/block'
import { Validate } from '../../../utils/validate/validate'
import { Form } from '../form'
import { renderChild } from '../../../utils/render'
import { getFormData } from '../get-form-data'
import { Router } from '../../../core/router/router'
import { Routes } from '../../../constants'
import { AuthController } from '../../../__data__/controllers/auth'

import { EventType } from '../login/types'
import { FORM_TEXT, FORM_ITEMS } from './constants'
import { validationScheme } from './validate-scheme'

export class Register extends Block {
    private static className = 'wrapper'

    constructor(props = {}) {
        super('div', {
            ...props,
            className: Register.className,
            components: [
                new Form({
                    ...FORM_TEXT,
                    items: FORM_ITEMS,
                    onSubmit: (event: EventType) => {
                        event.preventDefault()
                        const instance = new Validate(event.target, validationScheme)
                        const isValid = instance.validateOnSubmit()

                        if (!isValid) {
                            return
                        }

                        const registerData = getFormData(FORM_ITEMS, event.target)
                        AuthController.signUp(registerData, event.target)
                    },
                    validationScheme
                })
            ]
        })
    }

    componentDidRender() {
        // не пускаем на страницу, если нет авторизации
        if (this.state.get('auth.isAuthorized', null)) {
            new Router().go(Routes.Main)
            this.hide()
            return
        }

        renderChild(this.element, this.props.components)
    }
}
