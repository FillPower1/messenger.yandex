import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'

import template from './disabled.tmpl'

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
