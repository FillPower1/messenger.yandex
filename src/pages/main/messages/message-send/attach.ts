import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'

import template from './attach.tmpl.js'

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
