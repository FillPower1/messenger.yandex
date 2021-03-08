import { Block } from '../../../core/block/index.js'
import { render, renderChild } from '../../../utils/render.js'
import { ProfileButton } from '../../../components/profile-button/index.js'
import { Avatar } from '../../../components/avatar/index.js'
import { FormFields } from '../form-fields/index.js'
import { Validate } from '../../../utils/validate.js'
import { validationScheme } from './validate-scheme.js'

export class EditPassword extends Block {
    private static className = 'profile'

    constructor() {
        super('div', {
            className: EditPassword.className,
            components: [new ProfileButton(), new Avatar()]
        })
    }

    componentDidMount(oldProps: any): void {
        this.setProps({
            components: [
                ...oldProps.components,
                new FormFields({
                    items: [
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
                    ],
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

    componentDidRender() {
        renderChild(this.element, this.props.components)
    }
}

const page = new EditPassword()
render('#root', page)
