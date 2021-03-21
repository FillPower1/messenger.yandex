import { Block } from '../../../core/block/index.js'
import { renderChild } from '../../../utils/render.js'
import { ProfileButton } from '../../../components/profile-button/index.js'

import { Info } from './info/index.js'
import { UploadAvatar } from './upload-avatar/index.js'
import { Avatar } from '../../../components/avatar/avatar.js'
import { getIsAuthorized } from '../../../__data__/selectors/auth.js'
import Router from '../../../core/router/router.js'
import { Routes } from '../../../constants.js'

export class PersonalData extends Block {
    private static className = 'profile'

    constructor() {
        super('div', {
            className: PersonalData.className,
            components: [
                new ProfileButton(),
                new Avatar({ showBg: true }),
                new Info(),
                new UploadAvatar()
            ]
        })
    }

    componentDidMount(): void {
        this.connectToStore(this)
    }

    mapStateToProps(store: any) {
        const isAuthorized = getIsAuthorized(store)

        return {
            isAuthorized
        }
    }

    componentDidRender() {
        renderChild(this.element, this.props.components)
    }

    render() {
        if (!this.props?.isAuthorized) {
            new Router().go(Routes.login)
        }

        return ''
    }
}
