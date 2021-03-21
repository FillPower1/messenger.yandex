import { Block } from '../../../../core/block/index.js'
import { renderChild } from '../../../../utils/render.js'
import { templator } from '../../../../utils/templator.js'
import { dispatch } from '../../../../__data__/store.js'
import * as selectors from '../../../../__data__/selectors/personal-data.js'
import { logout as logoutAction } from '../../../../__data__/actions/auth.js'
import { getPersonalData } from '../../../../__data__/actions/personal-data.js'

import template from './info.tmpl.js'

const links = [
    {
        linkName: 'Изменить данные',
        href: '#profile/edit',
        className: 'profile__link--theme-info'
    },
    {
        linkName: 'Изменить пароль',
        href: '#profile/password/edit',
        className: 'profile__link--theme-info'
    }
]

export class Info extends Block {
    private static className = 'profile__wrapper'

    constructor() {
        super('div', {
            className: Info.className
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

    componentDidRender() {
        const logout = this.element.querySelector('#logout')
        logout?.addEventListener('click', () => dispatch(logoutAction()))

        renderChild(this.element, this.props.components, true)
    }

    render() {
        const { first_name, email, phone, display_name, login } = this.props

        return templator(template)({
            first_name,
            items: [
                {
                    description: 'Имя',
                    value: first_name
                },
                {
                    description: 'Почта',
                    value: email
                },
                {
                    description: 'Логин',
                    value: login
                },
                {
                    description: 'Имя в чате',
                    value: display_name
                },
                {
                    description: 'Телефон',
                    value: phone
                }
            ],
            links,
            link: {
                linkName: 'Выйти',
                id: 'logout'
            }
        })
    }
}
