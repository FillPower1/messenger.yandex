import { Block } from '../../../core/block/index.js'
import { renderChild } from '../../../utils/render.js'
import { Modal } from '../../../components/modal/index.js'

import { Header } from './header/index.js'
import { Disabled } from './disabled/index.js'
import { MessageList } from './message-list/index.js'
import { MessageSend } from './message-send/index.js'
import { MessagesTypes } from './types.js'

export class Messages extends Block {
    private static className = 'messages'

    constructor(props: MessagesTypes) {
        const { chatActive, ...rest } = props

        super('div', {
            ...rest,
            className: Messages.className,
            components: [
                new Header({ name: 'Андрей' }),
                chatActive ? new Disabled() : new MessageList({
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
                }),
                new MessageSend(),
                new Modal({
                    title: 'Добавить пользователя',
                    placeholder: 'Логин',
                    buttonName: 'Добавить'
                }),
                new Modal({
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
