import { Block } from '../../../../core/index.js'
import { templator } from '../../../../utils/templator.js'

import template from './search.tmpl.js'

export class Search extends Block {
    private static className = 'aside__header'

    constructor() {
        super('div', {
            className: Search.className
        })
    }

    render(): string {
        return templator(template)(this.props)
    }
}
