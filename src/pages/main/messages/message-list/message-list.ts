import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'
import { MessagesController } from '../../../../__data__/controllers/messages'

import template from './message-list.tmpl'
import { IMessage } from './types'

const messages = new MessagesController()

export class MessageList extends Block {
    private static className = 'messages__main'
    private position: 'top' | 'bottom' = 'bottom'

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

    formatMessages(messages: IMessage[]) {
        return messages.map((item: IMessage) => ({
            ...item,
            im: this.state.get('personalData.id') === item.user_id,
            time: new Date(item.time).toLocaleString()
        }))
    }

    onMessage(messages: IMessage[]) {
        let messageList = []

        if (messages.length === 1) {
            messageList = this.formatMessages([...this.props.messages, ...messages])
            this.position = 'bottom'
        } else {
            messageList = this.formatMessages([...messages, ...this.props.messages])
            this.position = 'top'
        }

        this.setProps({
            ...this.props,
            messages: this.unique(messageList)
        })
    }

    componentDidUpdate(oldProps: object, newProps: object) {
        return oldProps !== newProps
    }

    componentDidRender() {
        if (!this.position || this.position === 'bottom') {
            this.element.scrollTo(0, this.element.scrollHeight)
        }

        const btn = this.element.querySelector('button')

        if (btn) {
            btn.onclick = () => {
                if (this.props.messages.length !== this.state.get('unread_count', 0)) {
                    messages.getOldMessages(this.props.messages.length)
                    this.element.scrollTo(0, 0)
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
