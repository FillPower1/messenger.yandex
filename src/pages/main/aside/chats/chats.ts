import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'
import { ChatsController } from '../../../../__data__/controllers/chats'
import { ActiveChatController } from '../../../../__data__/controllers/active-chat'
import { PersonalDataController } from '../../../../__data__/controllers/personal-data'

import template from './chats.tmpl'
import { IChat } from './types'

export class Chats extends Block {
    private static className = 'dialogs'

    constructor() {
        super('ul', {
            className: Chats.className
        })
    }

    componentDidMount(): void {
        PersonalDataController.getPersonalData()
        ChatsController.subscribe(this)
        ChatsController.getChats()

        this.handleClickItem = this.handleClickItem.bind(this)

        this.element.onclick = this.handleClickItem
    }

    handleClickItem(event: any) {
        const target = event.target

        if (target.classList.contains('dialog')) {
            const chatId = target.getAttribute('id')
            const title = target.querySelector('.dialog__peer').textContent

            ActiveChatController.setActiveChat(title, chatId)
            this.setProps({ activeChatId: chatId })
        }
    }

    componentDidUpdate(oldProps: any, newProps: any) {
        return oldProps?.activeChatId !== newProps?.activeChatId
    }

    render(): string {
        let chats = this.state.get('chatList', [])

        chats = chats
            .map((chat: IChat) => ({ ...chat, last_message: JSON.parse(chat.last_message) }))
            .map((chat: IChat) => {
                if (chat.id === Number(this.props.activeChatId)) {
                    return {
                        ...chat,
                        active: true
                    }
                }

                return chat
            })

        return templator(template)({ chats })
    }
}
