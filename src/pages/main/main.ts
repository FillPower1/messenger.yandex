import { Block } from '../../core/index.js'
import { render, renderChild } from '../../utils/render.js'

import { Aside } from './aside/index.js'
import { Messages } from './messages/index.js'

export class Main extends Block {
    private static className = 'main'

    constructor() {
        super('main', {
            className: Main.className,
            components: [new Aside(), new Messages({ chatActive: false })]
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }
}

const page = new Main()
render('#root', page)
