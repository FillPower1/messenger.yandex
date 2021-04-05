import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'

import template from './attach.tmpl'

export class Attach extends Block {
    private static className = 'messages-send__attach'

    constructor() {
        super('div', {
            className: Attach.className
        })
    }

    render(): string {
        return templator(template)(this.props)
    }
}
