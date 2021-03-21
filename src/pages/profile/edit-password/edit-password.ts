import { Block } from '../../../core/block/index.js'
import { renderChild } from '../../../utils/render.js'
import { ProfileButton } from '../../../components/profile-button/index.js'
import { Avatar } from '../../../components/avatar/index.js'
import { FormFields } from '../form-fields/index.js'
import { Validate } from '../../../utils/validate.js'
import { validationScheme } from './validate-scheme.js'
import { getFormData } from '../../authentication/get-form-data.js'
import { dispatch } from '../../../__data__/store.js'
import { changePassword, resetPasswordStatus } from '../../../__data__/actions/personal-data.js'
import { getPasswordChangeStatus } from '../../../__data__/selectors/personal-data.js'
import { getIsAuthorized } from '../../../__data__/selectors/auth.js'
import Router from '../../../core/router/router.js'

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

    constructor() {
        super('div', {
            className: EditPassword.className,
            components: [
                new ProfileButton(),
                new Avatar(),
                new FormFields({
                    items,
                    onSubmit: (event: { preventDefault: () => void; target: HTMLFormElement }) => {
                        event.preventDefault()
                        const instance = new Validate(event.target, validationScheme)
                        const isValid = instance.validateOnSubmit()

                        if (!isValid) {
                            return
                        }

                        const passwordData = getFormData(items, event.target)
                        dispatch(changePassword(passwordData))
                    },
                    validationScheme
                })
            ]
        })
    }

    componentDidMount(): void {
        this.connectToStore(this)
    }

    mapStateToProps(store: any) {
        const status = getPasswordChangeStatus(store)
        const isAuthorized = getIsAuthorized(store)

        return {
            status,
            isAuthorized
        }
    }

    componentDidRender() {
        renderChild(this.element, this.props.components)
    }

    render() {
        const { isAuthorized, status } = this.props

        if (status || !isAuthorized) {
            new Router().back()
            dispatch(resetPasswordStatus())
        }

        return ''
    }
}
