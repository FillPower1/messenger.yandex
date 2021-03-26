import { JSDOM } from 'jsdom'
import { expect } from 'chai'

describe('Modal', () => {
    beforeEach(() => {
        const dom = new JSDOM(
            `<html>
                <body>
                  <div class="modal">Модальное окно</div>
                  <button class="button">Кнопка</button>
                </body>
              </html>`,
            { url: 'http://localhost' }
        )

        global.window = dom.window
        global.document = dom.window.document
    })

    it('active modal', () => {
        const button = document.querySelector('.button')
        const modal = document.querySelector('.modal');

        (button as HTMLButtonElement).onclick = () => modal?.classList.add('modal--active');
        (button as HTMLButtonElement).click()

        expect(modal?.classList.contains('modal--active')).to.equal(true)
    })

    it('active modal and close modal', () => {
        const button = document.querySelector('.button')
        const modal = document.querySelector('.modal');

        (button as HTMLButtonElement).onclick = () => modal?.classList.add('modal--active');
        (button as HTMLButtonElement).click()

        document.body.onclick = () => modal?.classList.remove('modal--active')
        document.body.click()

        expect(modal?.classList.contains('modal--active')).to.equal(false)
    })
})
