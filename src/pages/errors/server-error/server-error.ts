import { Block } from '../../../core/block'
import { templator } from '../../../utils/templator'
import { Link } from '../../../utils/link'

import template from '../template.tmpl'

export class ServerError extends Block {
    private static className = 'error'

    constructor() {
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
