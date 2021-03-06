import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'

import template from './info.tmpl.js'

export class Info extends Block {
    private static className = 'profile__wrapper'

    constructor() {
        super('div', {
            className: Info.className
        })
    }

    render() {
        return templator(template)({
            name: 'Иван',
            items: [
                {
                    description: 'Имя',
                    value: 'Иванов'
                },
                {
                    description: 'Почта',
                    value: 'pochta@yandex.ru'
                },
                {
                    description: 'Логин',
                    value: 'ivanivanov'
                },
                {
                    description: 'Имя в чате',
                    value: 'ivanpro'
                },
                {
                    description: 'Телефон',
                    value: '+7 (909) 967 30 30'
                }
            ],
            links: [
                {
                    linkName: 'Изменить данные',
                    href: 'edit-profile-data.html',
                    className: 'profile__link--theme-info'
                },
                {
                    linkName: 'Изменить пароль',
                    href: 'edit-profile-password.html',
                    className: 'profile__link--theme-info'
                },
                {
                    linkName: 'Выйти',
                    href: 'login.html',
                    className: 'profile__link--theme-danger'
                }
            ]
        })
    }
}
