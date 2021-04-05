import { Block } from '../../core/block'
import { templator } from '../../utils/templator'
import { Link } from '../../utils/link'

import template from './profile-button.tmpl'

export class ProfileButton extends Block {
    private static className = 'profile__button'

    constructor() {
        super('div', {
            className: ProfileButton.className
        })
    }

    componentDidRender(): void {
        Link(this.element.querySelector('a'))
    }

    render() {
        return templator(template)({})
    }
}
