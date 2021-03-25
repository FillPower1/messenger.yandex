import { Block } from '../../../core/block/index.js'
import { renderChild } from '../../../utils/render.js'

import { Header } from './header/index.js'
import { Disabled } from './disabled/index.js'
import { MessageList } from './message-list/index.js'
import { MessageSend } from './message-send/index.js'
import { ActiveChatController } from '../../../__data__/controllers/message.js'

const MOCK = {
    messages: [
        {
            text: 'Тестовое сообщение для теста сообщений',
            time: '21:24'
        },
        {
            text: 'Тестовое сообщение для теста сообщений',
            time: '21:24',
            im: true,
            read: true
        },
        {
            text: 'Тестовое сообщение для теста сообщений',
            time: '21:24',
            im: true,
            read: false
        },
        {
            date: '19 июня'
        },
        {
            text: 'Тестовое сообщение для теста сообщений',
            time: '21:34',
            attach: {
                image:
                    'https://c.pxhere.com/photos/54/aa/cat_animal_nature_close_up-1106847.jpg!d'
            }
        }
    ]
}

export class Messages extends Block {
    private static className = 'messages'

    constructor() {
        super('div', {
            className: Messages.className,
            components: [new Disabled()]
        })
    }

    componentDidMount() {
        ActiveChatController.subscribe(this)
    }

    componentDidRender(): void {
        const activeTitle = this.state.get('chats.activeChat.title', '')

        if (activeTitle) {
            this.setProps({
                components: [
                    new Header(),
                    new MessageList(MOCK),
                    new MessageSend()
                ]
            })
        }

        renderChild(this.element, this.props.components)
    }
}
