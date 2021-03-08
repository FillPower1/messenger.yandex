import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'

import template from './dialogs.tmpl.js'
import { DialogsTypes } from './types.js'

export class Dialogs extends Block {
    private static className = 'dialogs'

    constructor(props: DialogsTypes) {
        super('ul', {
            ...props,
            className: Dialogs.className
        })
    }

    render(): string {
        return templator(template)(this.props)
    }
}
