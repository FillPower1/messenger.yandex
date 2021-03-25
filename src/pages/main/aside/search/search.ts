import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'
import { CreateChat } from '../create-chat/create-chat.js'
import { renderChild } from '../../../../utils/render.js'
import { Link } from '../../../../utils/link.js'

import template from './search.tmpl.js'

export class Search extends Block {
    private static className = 'aside__header'

    constructor() {
        super('div', {
            className: Search.className,
            components: [new CreateChat()]
        })
    }

    componentWillUnmount() {
        this.props.components?.forEach((Component) => Component.hide())
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
        Link(this.element.querySelector('a'))
    }

    render(): string {
        return templator(template)(this.props)
    }
}
