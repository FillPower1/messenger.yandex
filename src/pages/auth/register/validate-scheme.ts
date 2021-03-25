export const validationScheme = {
    email: {
        pattern: /^[^@]+@[^@.]+\.[^@]+$/,
        rules: [
            {
                type: 'required',
                prompt: 'Введите email'
            },
            {
                type: 'invalid',
                prompt: 'Введите корректный email'
            },
        ]
    },
    login: {
        rules: [
            {
                type: 'required',
                prompt: 'Введите логин'
            }
        ]
    },
    first_name: {
        rules: [
            {
                type: 'required',
                prompt: 'Введите имя'
            },
        ]
    },
    second_name: {
        value: '',
        rules: [
            {
                type: 'required',
                prompt: 'Введите фамилию'
            },
        ]
    },
    phone: {
        pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        rules: [
            {
                type: 'required',
                prompt: 'Введите телефон'
            },
            {
                type: 'invalid',
                prompt: 'Введите корректный телефон'
            }
        ]
    },
    password: {
        pattern: /[0-9a-zA-Z!@#$%^&*]{6,}/,
        rules: [
            {
                type: 'required',
                prompt: 'Введите пароль'
            },
            {
                type: 'invalid',
                prompt: 'Минимальное количество символов 6'
            }
        ]
    }
}
