const { JSDOM } = require('jsdom')
const sinon = require('sinon')

describe('UploadAvatar', () => {
    beforeEach(() => {
        const dom = new JSDOM(
            `<html>
                <body>
                  <form>
                    <input class="form__input visually-hidden" name="avatar" type="file" accept="image/*">
                  </form>
                </body>
              </html>`,
            { url: 'http://localhost' }
        )

        global.window = dom.window
        global.document = dom.window.document
    })

    it('input click', () => {
        const input = document.querySelector('input');
        const spy = sinon.spy();

        (input as HTMLInputElement).onclick = (event) => {
            event.preventDefault()
            spy()
        };

        (input as HTMLInputElement).click();

        sinon.assert.calledOnce(spy)
    })
})
