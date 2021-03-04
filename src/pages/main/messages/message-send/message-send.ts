import { Block } from '../../../../core/index.js'
import { renderChild } from '../../../../utils/render.js'

import { Form } from './form.js'

export class MessageSend extends Block {
    private static className = 'messages-send'

    constructor() {
        super('div', {
            className: MessageSend.className,
            components: [new Form()],
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }
}
