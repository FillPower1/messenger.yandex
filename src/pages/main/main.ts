import { Block } from '../../core/block/index.js'
import { renderChild } from '../../utils/render.js'
import { Modal } from '../../components/modal/modal.js'

import { Aside } from './aside/index.js'
import { Messages } from './messages/index.js'

export class Main extends Block {
    private static className = 'main'

    constructor() {
        super('main', {
            className: Main.className,
            components: [
                new Aside(),
                new Messages({ chatActive: true }),
                new Modal({
                    type: 'create-chat',
                    title: 'Создать чат',
                    placeholder: 'Название чата',
                    buttonName: 'Создать'
                }),
                new Modal({
                    type: 'add-user',
                    title: 'Добавить пользователя',
                    placeholder: 'Логин',
                    buttonName: 'Добавить'
                }),
                new Modal({
                    type: 'delete-user',
                    title: 'Удалить пользователя',
                    placeholder: 'Логин',
                    buttonName: 'Удалить'
                })
            ]
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }
}
