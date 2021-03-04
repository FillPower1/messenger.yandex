import { Block } from '../../../../core/index.js'
import { templator } from '../../../../utils/templator.js'

import template from './header.tmpl.js'
import { HeaderTypes } from './types.js'

export class Header extends Block {
    private static className = 'messages__header'

    constructor(props: HeaderTypes) {
        super('div', {
            ...props,
            className: Header.className
        })
    }

    render(): string {
        return templator(template)(this.props)
    }
}
