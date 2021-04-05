import { Block } from '../../../core/block'
import { templator } from '../../../utils/templator'
import { Link } from '../../../utils/link'

import template from '../template.tmpl'

export class NotFound extends Block {
    private static className = 'error'

    constructor() {
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
