const { expect } = require('chai')
const { JSDOM } = require('jsdom')

const { getFormData } = require ('../get-form-data')

const ITEMS = [
    { name: 'login' },
    { name: 'password' }
]

describe('FormData', () => {
    beforeEach(() => {
        const dom = new JSDOM(
            `<html>
                <body>
                  <form>
                    <input type="text" name="login">
                    <input type="text" name="password">
                  </form>
                </body>
              </html>`,
            { url: 'http://localhost' }
        )

        global.window = dom.window
        global.document = dom.window.document
    })

    it('empty formData', () => {
        const form = document.querySelector('form');
        let result

        (form as HTMLFormElement).onsubmit = (event) => {
            event.preventDefault()
            result = getFormData(ITEMS, event.target)
        };

        (form as HTMLFormElement).submit();

        expect(result).to.eql({ login: '', password: '' })
    })

    it('with login and password not empty field', () => {
        const form = document.querySelector('form');

        if (form) {
            form.elements.login.value = 'test'
            form.elements.password.value = '123456'
            let result

            (form as HTMLFormElement).onsubmit = (event) => {
                event.preventDefault()
                result = getFormData(ITEMS, event.target)
            };

            (form as HTMLFormElement).submit();

            expect(result).to.eql({ login: 'test', password: '123456' })
        }
    })
})
