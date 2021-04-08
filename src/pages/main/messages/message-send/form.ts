import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'
import { renderChild } from '../../../../utils/render'

import template from './form.tmpl'

export class Form extends Block {
    private static className = 'messages-send__form'

    constructor(props: any) {
        super('form', {
            ...props,
            className: Form.className
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components, true)
    }

    render(): string {
        return templator(template)(this.props)
    }
}
