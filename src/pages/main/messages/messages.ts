import { Block } from '../../../core/block'
import { renderChild } from '../../../utils/render'

import { Header } from './header'
import { Disabled } from './disabled'
import { MessageList } from './message-list'
import { MessageSend } from './message-send'
import { ActiveChatController } from '../../../__data__/controllers/message'

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
                image: 'https://c.pxhere.com/photos/54/aa/cat_animal_nature_close_up-1106847.jpg!d'
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
                components: [new Header(), new MessageList(MOCK), new MessageSend()]
            })
        }

        renderChild(this.element, this.props.components)
    }
}
