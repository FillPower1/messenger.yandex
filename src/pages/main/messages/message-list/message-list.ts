import { Block } from '../../../../core/index.js'
import { templator } from '../../../../utils/templator.js'

import template from './message-list.tmpl.js'
import { MessageListTypes } from './types.js'

export class MessageList extends Block {
    private static className = 'messages__main'

    constructor(props: MessageListTypes) {
        super('div', {
            ...props,
            className: MessageList.className
        })
    }

    render(): string {
        return templator(template)(this.props)
    }
}
