import { Block } from '../../../core/block/index.js'
import { templator } from '../../../utils/templator.js'
import { render } from '../../../utils/render.js'

import { ErrorTypes } from '../types.js'
import template from '../template.js'

export class NotFound extends Block {
    private static className = 'error'

    constructor(props: ErrorTypes) {
        super('div', {
            ...props,
            className: NotFound.className
        })
    }

    render(): string {
        return templator(template)(this.props)
    }
}

const page = new NotFound({
    title: '404',
    description: 'Мы уже фиксим',
    link: 'Назад к чатам'
})

render('#root', page)
