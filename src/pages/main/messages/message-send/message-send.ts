import { Block } from '../../../../core/block'
import { renderChild } from '../../../../utils/render'

import { Form } from './form'

export class MessageSend extends Block {
    private static className = 'messages-send'

    constructor() {
        super('div', {
            className: MessageSend.className,
            components: [new Form()]
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }
}
