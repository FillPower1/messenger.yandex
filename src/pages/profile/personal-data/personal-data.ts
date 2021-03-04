import { Block } from '../../../core/index.js'
import { render, renderChild } from '../../../utils/render.js'
import { ProfileButton } from '../../../components/profile-button/index.js'
import { Avatar } from '../../../components/avatar/index.js'

import { Info } from './info/index.js'
import { UploadAvatar } from './upload-avatar/index.js'

export class PersonalData extends Block {
    private static className = 'profile'

    constructor() {
        super('div', {
            className: PersonalData.className,
            components: [new ProfileButton(), new Avatar(), new Info(), new UploadAvatar()],
        })
    }

    componentDidRender() {
        renderChild(this.element, this.props.components)
    }
}

const page = new PersonalData()
render('#root', page)
