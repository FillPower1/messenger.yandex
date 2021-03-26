import { JSDOM } from 'jsdom'
import sinon from 'sinon'

describe('Form', () => {
    beforeEach(() => {
        const dom = new JSDOM(
            `<html>
                <body>
                  <form class="form">
                    <input type="text">
                  </form>
                </body>
              </html>`,
            { url: 'http://localhost' }
        )

        global.window = dom.window
        global.document = dom.window.document
    })

    it('form submit', () => {
        const form = document.querySelector('form');
        const mock = sinon.spy();

        (form as HTMLFormElement).onsubmit = () => mock();
        (form as HTMLFormElement).submit();

        sinon.assert.calledOnce(mock)
    })
})
