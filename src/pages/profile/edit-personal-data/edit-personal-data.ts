import { Block } from '../../../core/block/index.js'
import { renderChild } from '../../../utils/render.js'
import { Validate } from '../../../utils/validate.js'
import { ProfileButton } from '../../../components/profile-button/index.js'
import { Avatar } from '../../../components/avatar/index.js'
import { FormFields } from '../form-fields/index.js'
import { dispatch } from '../../../__data__/store.js'
import { editPersonalData, getPersonalData } from '../../../__data__/actions/personal-data.js'
import * as selectors from '../../../__data__/selectors/personal-data.js'
import { getFormData } from '../../authentication/get-form-data.js'
import { Router } from '../../../core/router/index.js'

import { validationScheme } from './validate-scheme.js'

export class EditPersonalData extends Block {
    private static className = 'profile'

    constructor() {
        super('div', {
            className: EditPersonalData.className
        })
    }

    componentDidMount(): void {
        this.connectToStore(this)
        dispatch(getPersonalData())
    }

    mapStateToProps(store: any) {
        const personalData = selectors.getPersonalData(store)

        return {
            ...personalData
        }
    }

    componentDidRender(): void {
        const {
            email, login, first_name,
            second_name, display_name, phone
        } = this.props

        this.setProps({
            components: [
                new ProfileButton(), new Avatar(),
                new FormFields({
                    items: [
                        {
                            description: 'Почта',
                            name: 'email',
                            value: email,
                            type: 'email'
                        },
                        {
                            description: 'Логин',
                            name: 'login',
                            value: login,
                            type: 'text'
                        },
                        {
                            description: 'Имя',
                            name: 'first_name',
                            value: first_name,
                            type: 'text'
                        },
                        {
                            description: 'Фамилия',
                            name: 'second_name',
                            value: second_name,
                            type: 'text'
                        },
                        {
                            description: 'Имя в чате',
                            name: 'display_name',
                            value: display_name,
                            type: 'text'
                        },
                        {
                            description: 'Телефон',
                            name: 'phone',
                            value: phone,
                            type: 'text'
                        }
                    ],
                    onSubmit: this.onSubmit,
                    validationScheme
                })
            ]
        })

        renderChild(this.element, this.props.components)
    }

    onSubmit(event: { preventDefault: () => void; target: HTMLFormElement }): void {
        event.preventDefault()
        const instance = new Validate(event.target, validationScheme)
        const isValid = instance.validateOnSubmit()

        if (!isValid) {
            return
        }

        const data = getFormData([
            { name: 'email' },
            { name: 'login' },
            { name: 'first_name' },
            { name: 'second_name' },
            { name: 'display_name' },
            { name: 'phone' }
        ], event.target)

        dispatch(editPersonalData(data))
        new Router().back()
    }
}
