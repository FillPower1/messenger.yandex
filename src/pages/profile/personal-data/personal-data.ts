import { Block } from '../../../core/block'
import { renderChild } from '../../../utils/render'
import { ProfileButton } from '../../../components/profile-button'
import { Avatar } from '../../../components/avatar/avatar'

import { Info } from './info'
import { UploadAvatar } from './upload-avatar'

export class PersonalData extends Block {
    private static className = 'profile'

    constructor() {
        super('div', {
            className: PersonalData.className,
            components: [new ProfileButton(), new Avatar(), new Info(), new UploadAvatar()]
        })
    }

    componentDidRender() {
        renderChild(this.element, this.props.components)
    }
}
