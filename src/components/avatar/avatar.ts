import { Block } from '../../core/block/block.js'
import { templator } from '../../utils/templator.js'

import template from './avatar.tmpl.js'

export class Avatar extends Block {
    private static className = 'profile__avatar'

    constructor() {
        super('div', {
            className: Avatar.className,
        })
    }

    render() {
        return templator(template)(this.props)
    }
}
