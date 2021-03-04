export const validationScheme = {
    oldPassword: {
        rules: [
            {
                type: 'required',
                prompt: 'Введите старый пароль'
            }
        ]
    },
    newPassword: {
        pattern: /[0-9a-zA-Z!@#$%^&*]{6,}/,
        rules: [
            {
                type: 'required',
                prompt: 'Введите новый пароль'
            },
            {
                type: 'invalid',
                prompt: 'Минимальное количество символов 6'
            }
        ]
    }
}
