import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'
import { ChatsController } from '../../../../__data__/controllers/chats.js'
import { ActiveChatController } from '../../../../__data__/controllers/message.js'

import template from './chats.tmpl.js'

export class Chats extends Block {
    private static className = 'dialogs'

    constructor() {
        super('ul', {
            className: Chats.className
        })
    }

    componentDidMount(): void {
        ChatsController.subscribe(this)
        ChatsController.getChats()

        this.handleClickItem = this.handleClickItem.bind(this)

        this.element.onclick = this.handleClickItem
    }

    handleClickItem(event: any) {
        const target = event.target

        if (target.classList.contains('dialog')) {
            const chatId = target.getAttribute('id')
            const title = target.textContent.trim()

            ActiveChatController.setActiveChat(title, chatId)
        }
    }

    render(): string {
        const chats = this.state.get('chats', {})
        return templator(template)({ chats })
    }
}
