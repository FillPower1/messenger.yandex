import { FormItemsType } from './login/types'

export const getFormData = (formItems: FormItemsType[], form: any) => {
    return formItems
        .map(({ name }) => form.elements[name])
        .reduce((memo, input) => {
            memo[input.name] = input.value
            return memo
        }, {})
}
