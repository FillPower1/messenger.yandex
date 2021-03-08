import { Block } from '../../../core/block/index.js'
import { templator } from '../../../utils/templator.js'
import { render } from '../../../utils/render.js'

import { ErrorTypes } from '../types.js'
import template from '../template.js'

export class ServerError extends Block<ErrorTypes> {
    private static className = 'error'

    constructor(props: ErrorTypes) {
        super('div', {
            ...props,
            className: ServerError.className
        })
    }

    render() {
        return templator(template)(this.props)
    }
}

const page = new ServerError({
    title: '500',
    description: 'Мы уже фиксим',
    link: 'Назад к чатам'
})

render('#root', page)
