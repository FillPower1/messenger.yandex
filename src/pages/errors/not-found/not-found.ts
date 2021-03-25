import { Block } from '../../../core/block/index.js'
import { templator } from '../../../utils/templator.js'
import { Link } from '../../../utils/link.js'

import { ErrorTypes } from '../types.js'
import template from '../template.js'

export class NotFound extends Block<ErrorTypes> {
    private static className = 'error'

    constructor(props: ErrorTypes) {
        super('div', {
            className: NotFound.className,
            title: '404',
            description: 'Мы уже фиксим',
            link: 'Назад к чатам'
        })
    }

    componentDidRender(): void {
        Link(this.element.querySelector('a'))
    }

    render(): string {
        return templator(template)(this.props)
    }
}
