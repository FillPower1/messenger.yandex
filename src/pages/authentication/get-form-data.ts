export const getFormData = (formItems: { name: string }[], form: any) => {
    return formItems
        .map(({ name }) => form.elements[name])
        .reduce((memo, input) => {
            memo[input.name] = input.value
            return memo
        }, {})
}
