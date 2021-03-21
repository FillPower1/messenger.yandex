import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'
import { dispatch } from '../../../../__data__/store.js'
import { getChats } from '../../../../__data__/actions/chats.js'

import template from './chats.tmpl.js'
import { DialogsTypes } from './types.js'

export class Chats extends Block {
    private static className = 'dialogs'

    constructor(props: DialogsTypes) {
        super('ul', {
            ...props,
            className: Chats.className
        })
    }

    componentDidMount(oldProps: {} = {}): void {
        this.connectToStore(this)
        dispatch(getChats())
    }

    render(): string {
        return templator(template)(this.props)
    }
}
