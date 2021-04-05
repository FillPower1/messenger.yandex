import { Block } from '../../../core/block'
import { templator } from '../../../utils/templator'
import { Link } from '../../../utils/link'

import { ErrorTypes } from '../types'
import template from '../template'

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

    componentDidRender(): void {
        Link(this.element.querySelector('a'))
    }

    render() {
        return templator(template)(this.props)
    }
}
