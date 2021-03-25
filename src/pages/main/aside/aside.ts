import { Block } from '../../../core/block/index.js'
import { renderChild } from '../../../utils/render.js'

import { Search } from './search/index.js'
import { Chats } from './chats/index.js'

export class Aside extends Block {
    private static className = 'aside'

    constructor() {
        super('aside', {
            className: Aside.className,
            components: [
                new Search(),
                new Chats()
            ]
        })
    }

    componentWillUnmount() {
        this.props.components?.forEach((Component) => Component.hide())
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }
}
