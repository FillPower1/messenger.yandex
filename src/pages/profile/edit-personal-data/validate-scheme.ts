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
        rules: [
            {
                type: 'required',
                prompt: 'Введите фамилию'
            },
        ]
    },
    display_name: {
        rules: []
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
    }
}
