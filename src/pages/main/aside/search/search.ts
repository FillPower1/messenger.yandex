import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'
import { CreateChat } from '../create-chat/create-chat'
import { renderChild } from '../../../../utils/render'
import { Link } from '../../../../utils/link'

import template from './search.tmpl'

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
