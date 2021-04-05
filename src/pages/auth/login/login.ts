import { Block } from '../../../core/block/index'
import { renderChild } from '../../../utils/render'
import { Form } from '../form/index'
import { Validate } from '../../../utils/validate/validate'
import { getFormData } from '../get-form-data'
import { Router } from '../../../core/router/router'
import { Routes } from '../../../constants'
import { AuthController } from '../../../__data__/controllers/auth'

import { EventType } from './types'
import { validationScheme } from './validate-scheme'
import { FORM_TEXT, FORM_ITEMS } from './constants'

export class Login extends Block {
    private static className = 'wrapper'

    constructor() {
        super('div', {
            className: Login.className,
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

                        const loginData = getFormData(FORM_ITEMS, event.target)
                        AuthController.signIn(loginData, event.target)
                    },
                    validationScheme
                })
            ]
        })
    }

    componentDidRender(): void {
        // редирект, если есть авторизация
        if (this.state.get('auth.isAuthorized', null)) {
            new Router().go(Routes.Main)
            this.hide()
            return
        }

        renderChild(this.element, this.props.components)
    }
}
