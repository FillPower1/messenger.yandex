import { Block } from '../../core/block/index.js'
import { renderChild } from '../../utils/render.js'
import { Modal } from '../../components/modal/modal.js'
import { Router } from '../../core/router/router.js'
import { Routes } from '../../constants.js'

import { Aside } from './aside/index.js'
import { Messages } from './messages/index.js'

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
