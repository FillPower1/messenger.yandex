import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'
import { renderChild } from '../../../../utils/render.js'

import { Attach } from './attach.js'
import template from './form.tmpl.js'

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
