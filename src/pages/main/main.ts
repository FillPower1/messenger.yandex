import { Block } from '../../core/block'
import { renderChild } from '../../utils/render'
import { Modal } from '../../components/modal/modal'
import { Router } from '../../core/router/router'
import { Routes } from '../../constants'

import { Aside } from './aside'
import { Messages } from './messages'

export class Main extends Block {
    private static className = 'main'

    constructor() {
        super('main', {
            className: Main.className,
            components: [
                new Aside(),
                new Messages(),
                new Modal({
                    type: 'create-chat',
                    title: 'Создать чат',
                    placeholder: 'Название чата',
                    buttonName: 'Создать',
                    method: 'create'
                }),
                new Modal({
                    type: 'add-user',
                    title: 'Добавить пользователя',
                    placeholder: 'Логин',
                    buttonName: 'Добавить',
                    method: 'add'
                }),
                new Modal({
                    type: 'delete-user',
                    title: 'Удалить пользователя',
                    placeholder: 'Логин',
                    buttonName: 'Удалить',
                    method: 'delete'
                })
            ]
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }

    render() {
        // редирект, если нет авторизации
        if (!this.state.get('auth.isAuthorized', null)) {
            new Router().go(Routes.Login)
            this.hide()
        }

        return ''
    }
}
