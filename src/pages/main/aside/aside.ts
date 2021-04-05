import { Block } from '../../../core/block'
import { renderChild } from '../../../utils/render'

import { Search } from './search'
import { Chats } from './chats'

export class Aside extends Block {
    private static className = 'aside'

    constructor() {
        super('aside', {
            className: Aside.className,
            components: [new Search(), new Chats()]
        })
    }

    componentWillUnmount() {
        this.props.components?.forEach((Component) => Component.hide())
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }
}
