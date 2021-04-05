import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'

import template from './message-list.tmpl'
import { MessageListTypes } from './types'

export class MessageList extends Block<MessageListTypes> {
    private static className = 'messages__main'

    constructor(props: MessageListTypes) {
        super('div', {
            ...props,
            className: MessageList.className
        })
    }

    render(): string {
        return templator(template)({
            ...this.props
        })
    }
}
