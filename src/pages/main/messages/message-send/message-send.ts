import { Block } from '../../../../core/block'
import { renderChild } from '../../../../utils/render'
import { MessagesController } from '../../../../__data__/controllers/messages'

import { Form } from './form'

export class MessageSend extends Block {
    private static className = 'messages-send'
    messages: MessagesController

    constructor() {
        super('div', {
            className: MessageSend.className,
            components: [
                new Form({
                    events: {
                        submit: (event: any) => {
                            event.preventDefault()

                            const input = event.target.querySelector('input')

                            if (!input.value) {
                                return
                            }

                            new MessagesController().send(input?.value, 'message')
                            event.target.reset()
                        }
                    }
                })
            ]
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }
}
