import { Block } from '../../core/block/block.js'
import { templator } from '../../utils/templator.js'

import template from './profile-button.tmpl.js'

export class ProfileButton extends Block {
    private static className = 'profile__button'

    constructor() {
        super('div', {
            className: ProfileButton.className,
        })
    }

    render() {
        return templator(template)()
    }
}
