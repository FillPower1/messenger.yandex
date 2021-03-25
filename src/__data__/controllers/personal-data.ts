import { Password, PersonalData, UserAPI } from '../../api/user-api.js'
import { Block } from '../../core/block/index.js'
import { State } from '../state.js'
import { SUCCESS_STATUS } from '../../constants.js'
import { Router } from '../../core/router/router.js'
import { Events } from '../../core/block/types.js'

const userApi = new UserAPI()
const state = new State()

export class PersonalDataController {
    static AvatarPage: Block
    static ProfilePage: Block
    static ChangePasswordPage: Block

    static avatarSubscribe(AvatarPage: Block): void {
        PersonalDataController.AvatarPage = AvatarPage
    }

    static profileInfoSubscribe(ProfilePage: Block): void {
        PersonalDataController.ProfilePage = ProfilePage
    }

    static changePasswordSubscribe(ChangePasswordPage: Block): void {
        PersonalDataController.ChangePasswordPage = ChangePasswordPage
    }

    static getPersonalData(): void {
        userApi.request()
            .then((personalData) => {
                state.set('personalData', personalData)

                PersonalDataController.AvatarPage.eventBus.emit(Events.FLOW_RENDER)
                PersonalDataController.ProfilePage.eventBus.emit(Events.FLOW_RENDER)
            })
            .catch((err) => console.error(err))
    }

    static updateAvatar(avatar: File): void {
        userApi.uploadAvatar(avatar)
            .then((personalData) => {
                state.set('personalData', personalData)

                PersonalDataController.AvatarPage.eventBus.emit(Events.FLOW_RENDER)
            })
            .catch((err) => console.error(err))
    }

    static editPersonalData(data: PersonalData): void {
        userApi.updatePersonalData(data)
            .then((personalData) => {
                state.set('personalData', personalData)

                new Router().back()
            })
            .catch((err) => console.error(err))
    }

    static changePassword(password: Password): void {
        userApi.updatePassword(password)
            .then((response) => {
                if (response === SUCCESS_STATUS) {
                    state.set('personalData', {
                        errorText: ''
                    })

                    new Router().back()
                } else {
                    state.set('personalData', {
                        errorText: response
                    })

                    PersonalDataController.ChangePasswordPage.eventBus.emit(Events.FLOW_RENDER)
                }
            })
            .catch((err) => console.error(err))
    }
}
