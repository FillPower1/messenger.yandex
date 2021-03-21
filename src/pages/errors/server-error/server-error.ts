import { Block } from '../../../core/block/index.js'
import { templator } from '../../../utils/templator.js'

import { ErrorTypes } from '../types.js'
import template from '../template.js'

export class ServerError extends Block<ErrorTypes> {
    private static className = 'error'

    constructor(props: ErrorTypes) {
        super('div', {
            className: ServerError.className,
            title: '500',
            description: 'Мы уже фиксим',
            link: 'Назад к чатам'
        })
    }

    render() {
        return templator(template)(this.props)
    }
}

