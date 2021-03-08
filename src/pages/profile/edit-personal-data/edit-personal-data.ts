import { Block } from '../../../core/block/index.js'
import { render, renderChild } from '../../../utils/render.js'
import { Validate } from '../../../utils/validate.js'
import { ProfileButton } from '../../../components/profile-button/index.js'
import { Avatar } from '../../../components/avatar/index.js'
import { FormFields } from '../form-fields/index.js'

import { validationScheme } from './validate-scheme.js'

const PERSONAL_MOCK_DATA = [
    {
        description: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        type: 'email'
    },
    {
        description: 'Логин',
        name: 'login',
        value: 'ivanivanov',
        type: 'text'
    },
    {
        description: 'Имя',
        name: 'first_name',
        value: 'Иван',
        type: 'text'
    },
    {
        description: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        type: 'text'
    },
    {
        description: 'Имя в чате',
        name: 'display_name',
        value: 'Иван',
        type: 'text'
    },
    {
        description: 'Телефон',
        name: 'phone',
        value: '+7 (909) 967 30 30',
        type: 'text'
    }
]

export class EditPersonalData extends Block {
    private static className = 'profile'

    constructor() {
        super('div', {
            className: EditPersonalData.className,
            components: [new ProfileButton(), new Avatar()]
        })
    }

    componentDidMount(oldProps: any): void {
        this.setProps({
            components: [
                ...oldProps.components,
                new FormFields({
                    items: PERSONAL_MOCK_DATA,
                    onSubmit: this.onSubmit,
                    validationScheme
                })
            ]
        })
    }

    onSubmit(event: { preventDefault: () => void; target: HTMLFormElement }): void {
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

const page = new EditPersonalData()
render('#root', page)
