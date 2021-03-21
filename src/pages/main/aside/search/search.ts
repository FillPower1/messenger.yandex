import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'
import { CreateChat } from '../create-chat/create-chat.js'
import { renderChild } from '../../../../utils/render.js'

import template from './search.tmpl.js'

export class Search extends Block {
    private static className = 'aside__header'

    constructor() {
        super('div', {
            className: Search.className,
            components: [new CreateChat()]
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }

    render(): string {
        return templator(template)(this.props)
    }
}
