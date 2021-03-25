import { Block } from '../../../core/block/index.js'
import { Validate } from '../../../utils/validate.js'
import { Form } from '../form/index.js'
import { renderChild } from '../../../utils/render.js'
import { getFormData } from '../get-form-data.js'
import { Router } from '../../../core/router/router.js'
import { Routes } from '../../../constants.js'
import { AuthController } from '../../../__data__/controllers/auth.js'

import { EventType } from '../login/types.js'
import { FORM_TEXT, FORM_ITEMS } from './constants.js'
import { validationScheme } from './validate-scheme.js'

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
