import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'

import template from './create-chat.tmpl.js'
import { ChatsController } from '../../../../__data__/controllers/chats.js'

export class CreateChat extends Block {
    private static className = 'aside__create'
    modal: HTMLElement | null

    constructor() {
        super('div', {
            className: CreateChat.className
        })

        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    componentDidMount(): void {
        window.addEventListener('click', this.handleWindowClick)
    }

    componentWillUnmount(): void {
        window.removeEventListener('click', this.handleWindowClick)
    }

    componentDidRender(): void {
        const button = this.element.querySelector('button');

        (button as HTMLButtonElement).onclick = () => {
            this.modal = document.querySelector('#create-chat')
            this.modal?.closest('.modal')?.classList.add('modal--active');

            (this.modal as HTMLFormElement).onsubmit = this.handleButtonClick
        }
    }

    async handleButtonClick(event: Event) {
        event.preventDefault()

        const input = this.modal?.querySelector('input')
        const errorField = this.modal?.querySelector('.form__error')

        const errorText = await ChatsController.createChat({ title: input?.value })

        if (errorText && errorText.reason) {
            (errorField as HTMLElement).textContent = errorText.reason
            return
        }

        (input as HTMLInputElement).value = '';
        (errorField as HTMLElement).textContent = ''
        this.modal?.closest('.modal')?.classList.remove('modal--active')
    }

    handleWindowClick(event: { target: any }) {
        if (event.target?.classList.contains('modal')) {
            event.target?.classList.remove('modal--active')
        }
    }

    render(): string {
        return templator(template)()
    }
}
