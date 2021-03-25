import { Block } from '../../core/block/block.js'
import { templator } from '../../utils/templator.js'
import { Link } from '../../utils/link.js'

import template from './profile-button.tmpl.js'

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
        return templator(template)()
    }
}
