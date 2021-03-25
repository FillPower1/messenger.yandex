export const validationScheme = {
    login: {
        rules: [
            {
                type: 'required',
                prompt: 'Введите логин'
            }
        ]
    },
    password: {
        rules: [
            {
                type: 'required',
                prompt: 'Введите пароль'
            }
        ]
    }
}
