import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'
import { renderChild } from '../../../../utils/render'

import { Attach } from './attach'
import template from './form.tmpl'

export class Form extends Block {
    private static className = 'messages-send__form'

    constructor() {
        super('form', {
            className: Form.className,
            components: [new Attach()]
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components, true)
    }

    render(): string {
        return templator(template)(this.props)
    }
}
