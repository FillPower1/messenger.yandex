// TODO: отрефачить повтор с добавлением webpack
import { validationScheme as validationRegisterScheme } from '../register/validate-scheme'
import { validationScheme as validationLoginScheme } from '../login/validate-scheme'

export type ValidationScheme = typeof validationLoginScheme | typeof validationRegisterScheme

export type FormType = {
    title: string
    text: string
    href: string
    link: string
    items: Array<{ name: string; placeholder: string; type: string }>
    onSubmit: (event: { preventDefault: () => void; target: HTMLFormElement }) => void
    validationScheme: ValidationScheme
}
