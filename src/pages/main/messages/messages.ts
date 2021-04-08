import { Block } from '../../../core/block'
import { renderChild } from '../../../utils/render'

import { Header } from './header'
import { Disabled } from './disabled'
import { MessageList } from './message-list'
import { MessageSend } from './message-send'
import { ActiveChatController } from '../../../__data__/controllers/active-chat'

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
        const activeTitle = this.state.get('activeChat.title', '')

        if (activeTitle) {
            this.setProps({
                components: [new Header(), new MessageList(), new MessageSend()]
            })
        }

        renderChild(this.element, this.props.components)
    }
}
