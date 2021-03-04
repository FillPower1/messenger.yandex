import { validationScheme as schemePersonalData } from '../edit-personal-data/validate-scheme.js'
import { validationScheme as schemePasswordData } from '../edit-password/validate-scheme.js'

export type FormFieldsTypes = {
    items: {
        description: string
        name: string
        value: string
        type: string
    }[]
    onSubmit: (event: { preventDefault: () => void; target: HTMLFormElement; }) => void
    validationScheme: typeof schemePersonalData | typeof schemePasswordData
}
