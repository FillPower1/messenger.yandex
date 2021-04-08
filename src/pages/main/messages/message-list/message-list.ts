import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'
import { MessagesController } from '../../../../__data__/controllers/messages'

import template from './message-list.tmpl'
import { IMessage } from './types'

const messages = new MessagesController()

export class MessageList extends Block {
    private static className = 'messages__main'

    constructor() {
        super('div', {
            className: MessageList.className,
            messages: []
        })
    }

    componentDidMount() {
        this.onMessage = this.onMessage.bind(this)

        messages.subscribe(this.onMessage)
    }

    unique(arr: IMessage[]) {
        const result: IMessage[] = []

        for (const elem of arr) {
            if (!result.find((item: IMessage) => item.id === elem.id)) {
                result.push(elem)
            }
        }

        return result
    }

    onMessage(messages: IMessage[]) {
        const messageList = this.props.messages.concat(messages).map((item: IMessage) => ({
            ...item,
            im: this.state.get('personalData.id') === item.user_id,
            time: new Date(item.time).toLocaleString()
        }))

        this.setProps({
            ...this.props,
            messages: this.unique(messageList)
        })
    }

    componentDidUpdate(oldProps: object, newProps: object) {
        return oldProps !== newProps
    }

    componentDidRender() {
        this.element.scrollTo(0, this.element.scrollHeight)

        const btn = this.element.querySelector('button')

        if (btn) {
            btn.onclick = () => {
                const lastMessage = this.props.messages[this.props.messages.length - 1]?.id

                if (this.props.messages.length !== this.state.get('unread_count', 0)) {
                    messages.getOldMessages(lastMessage)
                }
            }
        }
    }

    render(): string {
        return templator(template)({
            ...this.props
        })
    }
}
