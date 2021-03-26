import { JSDOM } from 'jsdom'
import { expect } from 'chai'

import { Validate } from '../validate'

describe('Vaidator', () => {
    beforeEach(() => {
        const dom = new JSDOM(
            `<html>
                <body>
                  <form class="form">
                   <div class="form__field">
                        <label>
                            <input class="login" type="text" name="login">
                        </label> 
                    </div> 
                  </form>
                </body>
              </html>`,
            { url: 'http://localhost' }
        )

        global.window = dom.window
        global.document = dom.window.document
    })

    it('validate input on focus', () => {
        const scheme = {
            login: {
                rules: [
                    {
                        type: 'required',
                        prompt: 'Введите логин'
                    }
                ]
            }
        }
        const form = document.querySelector('.form')
        const loginInput = document.querySelector('.login')

        if (form) {
            const validate = new Validate(form, scheme)
            validate.init();
            (loginInput as HTMLInputElement).focus()

            const error = form?.querySelector('span')
            expect(error?.textContent).to.be.include('Введите логин')
        }
    })

    it('validate input on submit if input value empty', () => {
        const scheme = {
            login: {
                rules: [
                    {
                        type: 'required',
                        prompt: 'Введите логин'
                    }
                ]
            }
        }
        const form = document.querySelector('.form')

        if (form) {
            const validate = new Validate(<HTMLFormElement>form, scheme)
            const isValid = validate.validateOnSubmit()

            expect(isValid).to.be.false
        }
    })

    it('validate input on submit with input value', () => {
        const scheme = {
            login: {
                rules: [
                    {
                        type: 'required',
                        prompt: 'Введите логин'
                    }
                ]
            }
        }
        const form = document.querySelector('.form')
        const loginInput = document.querySelector('.login');

        (loginInput as HTMLInputElement).value = 'test'


        if (form) {
            const validate = new Validate(<HTMLFormElement>form, scheme)
            const isValid = validate.validateOnSubmit()

            expect(isValid).to.be.true
        }
    })
})
