import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'

import template from './disabled.tmpl.js'

export class Disabled extends Block {
    private static className = 'messages__disabled'

    constructor() {
        super('div', {
            className: Disabled.className
        })
    }

    render(): string {
        return templator(template)(this.props)
    }
}
