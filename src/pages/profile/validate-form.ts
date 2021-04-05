import { Validate } from '../../utils/validate/validate'
import { EventType } from '../auth/login/types'

import { validationScheme as schemePersonalData } from './profile-edit/validate-scheme'
import { validationScheme as schemePasswordData } from './edit-password/validate-scheme'

type ValidationScheme = typeof schemePersonalData | typeof schemePasswordData

export function validateProfileForm(
    element: HTMLElement,
    validationScheme: ValidationScheme,
    submitCallback: (event: EventType | any) => void
) {
    const form = element.querySelector('.profile-data')

    form?.addEventListener('submit', submitCallback)

    if (form) {
        const instance = new Validate(<HTMLFormElement>form, validationScheme)
        instance.init()
    }
}
