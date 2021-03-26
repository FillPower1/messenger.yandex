import { Block } from '../../../core/block/index.js'
import { renderChild } from '../../../utils/render.js'
import { templator } from '../../../utils/templator.js'
import { Validate } from '../../../utils/validate/validate.js'
import { ProfileButton } from '../../../components/profile-button/index.js'
import { Avatar } from '../../../components/avatar/index.js'
import { EventType } from '../../auth/login/types.js'
import { getFormData } from '../../auth/get-form-data.js'
import { PersonalDataController } from '../../../__data__/controllers/personal-data.js'
import { validateProfileForm } from '../validate-form.js'

import { validationScheme } from './validate-scheme.js'
import template from './profile-edit.tmpl.js'

const FORM_ITEMS = [
    { name: 'email' },
    { name: 'login' },
    { name: 'first_name' },
    { name: 'second_name' },
    { name: 'display_name' },
    { name: 'phone' }
]

export class ProfileEdit extends Block {
    private static className = 'profile'
    profileEditForm: HTMLFormElement | null
    validate: Validate

    constructor() {
        super('div', {
            className: ProfileEdit.className,
            components: [new ProfileButton(), new Avatar({ showBg: false })]
        })

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(): void {
        PersonalDataController.profileInfoSubscribe(this)
        PersonalDataController.getPersonalData()
    }

    componentDidRender(): void {
        this.profileEditForm = this.element.querySelector('.profile-data')
        validateProfileForm(this.element, validationScheme, this.onSubmit)

        renderChild(this.element, this.props.components, true)
    }

    async onSubmit(event: EventType | any): Promise<void> {
        event.preventDefault()
        const isValid = new Validate(
            <HTMLFormElement>this.profileEditForm,
            validationScheme
        ).validateOnSubmit()

        if (!isValid) {
            return
        }

        const data = getFormData(FORM_ITEMS, event.target)
        PersonalDataController.editPersonalData(data)
    }

    render() {
        const { email, login, first_name, second_name, display_name, phone } = this.state.get(
            'personalData',
            {}
        )

        return templator(template)({
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
            ]
        })
    }
}
