import { Block } from '../../../../core/index.js'
import { templator } from '../../../../utils/templator.js'

import template from './upload-avatar.tmpl.js'

export class UploadAvatar extends Block {
    private static className = 'modal'

    constructor() {
        super('div', {
            className: UploadAvatar.className,
        })
    }

    render() {
        return templator(template)()
    }
}
