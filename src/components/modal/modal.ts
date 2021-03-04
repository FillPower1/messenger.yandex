import { Block } from '../../core/block.js'
import { templator } from '../../utils/templator.js'

import template from './modal.tmpl.js'
import { ModalTypes } from './types.js'

export class Modal extends Block {
    private static className = 'modal'

    constructor(props: ModalTypes) {
        super('div', {
            ...props,
            className: Modal.className,
        })
    }

    render(): string {
        return templator(template)(this.props)
    }
}
