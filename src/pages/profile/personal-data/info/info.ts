import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'
import { PersonalDataController } from '../../../../__data__/controllers/personal-data'
import { AuthController } from '../../../../__data__/controllers/auth'
import { Link } from '../../../../utils/link'

import template from './info.tmpl'

const LINKS = [
    {
        linkName: 'Изменить данные',
        href: '/profile-edit',
        className: 'profile__link--theme-info'
    },
    {
        linkName: 'Изменить пароль',
        href: '/password-edit',
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
        PersonalDataController.profileInfoSubscribe(this)
        PersonalDataController.getPersonalData()
    }

    componentDidRender() {
        const logout: HTMLButtonElement | null = this.element.querySelector('#logout')

        if (logout) {
            logout.onclick = () => AuthController.logout()
        }

        const links = this.element.querySelectorAll('a')
        links.forEach((link) => Link(link))
    }

    render() {
        const { first_name, email, phone, display_name, login, avatar } = this.state.get(
            'personalData',
            {}
        )

        return templator(template)({
            first_name,
            avatar,
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
            links: LINKS,
            link: {
                linkName: 'Выйти',
                href: '/login',
                id: 'logout'
            }
        })
    }
}
