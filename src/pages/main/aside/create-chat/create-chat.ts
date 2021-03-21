import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'
import { dispatch } from '../../../../__data__/store.js'
import { createChat } from '../../../../__data__/actions/chats.js'

import template from './create-chat.tmpl.js'

export class CreateChat extends Block {
    private static className = 'aside__create'

    constructor() {
        super('div', {
            className: CreateChat.className
        })
    }

    componentDidMount(): void {
        window.addEventListener('click', this.handleWindowClick)
    }

    componentWillUnmount(): void {
        window.removeEventListener('click', this.handleWindowClick)
    }

    componentDidRender(): void {
        const button = this.element.querySelector('button')

        button?.addEventListener('click', this.handleButtonClick)
    }

    // TODO: довести до ума/доработать
    handleButtonClick() {
        const modal = document.querySelector('#create-chat')
        modal?.closest('.modal')?.classList.add('modal--active')

        modal?.addEventListener('submit', (event) => {
            event.preventDefault()
            const input = modal.querySelector('input')
            dispatch(createChat({ title: input?.value }))
            modal?.closest('.modal')?.classList.remove('modal--active')
        })
    }

    handleWindowClick(event: any) {
        if (event.target?.classList.contains('modal')) {
            event.target?.classList.remove('modal--active')
        }
    }

    render(): string {
        return templator(template)(this.props)
    }
}
