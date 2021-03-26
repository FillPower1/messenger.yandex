import { Block } from '../../../core/block/index.js'
import { renderChild } from '../../../utils/render.js'
import { templator } from '../../../utils/templator.js'
import { ProfileButton } from '../../../components/profile-button/index.js'
import { Avatar } from '../../../components/avatar/index.js'
import { Validate } from '../../../utils/validate/validate.js'
import { validationScheme } from './validate-scheme.js'
import { getFormData } from '../../auth/get-form-data.js'
import { EventType } from '../../auth/login/types.js'
import { PersonalDataController } from '../../../__data__/controllers/personal-data.js'
import { validateProfileForm } from '../validate-form.js'

import template from './edit-password.tmpl.js'

const items = [
    {
        description: 'Старый пароль',
        name: 'oldPassword',
        value: '123456',
        type: 'password'
    },
    {
        description: 'Новый пароль',
        name: 'newPassword',
        value: '123456',
        type: 'password'
    }
]

export class EditPassword extends Block {
    private static className = 'profile'
    passwordEditForm: HTMLFormElement | null

    constructor() {
        super('div', {
            className: EditPassword.className,
            components: [new ProfileButton(), new Avatar({ showBg: false })]
        })
    }

    componentDidMount() {
        PersonalDataController.changePasswordSubscribe(this)
        PersonalDataController.getPersonalData()
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidRender() {
        this.passwordEditForm = this.element.querySelector('.profile-data')
        validateProfileForm(this.element, validationScheme, this.onSubmit)

        renderChild(this.element, this.props.components, true)
    }

    onSubmit(event: EventType | any): void {
        event.preventDefault()
        const instance = new Validate(<HTMLFormElement>this.passwordEditForm, validationScheme)
        const isValid = instance.validateOnSubmit()

        if (!isValid) {
            return
        }

        const passwordData = getFormData(items, event.target)
        PersonalDataController.changePassword(passwordData)
    }

    render() {
        const errorText = this.state.get('personalData.errorText', '')

        return templator(template)({
            items,
            errorText
        })
    }
}
