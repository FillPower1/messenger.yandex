import { Block } from '../../core/block'
import { templator } from '../../utils/templator'

import template from './modal.tmpl'
import { ModalTypes } from './types'

export class Modal extends Block<ModalTypes> {
    private static className = 'modal'

    constructor(props: ModalTypes) {
        super('div', {
            ...props,
            className: Modal.className
        })
    }

    render(): string {
        return templator(template)(this.props)
    }
}
