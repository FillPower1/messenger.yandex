import { Block } from '../../../../core/block'
import { templator } from '../../../../utils/templator'
import { ActiveChatController } from '../../../../__data__/controllers/active-chat'

import template from './header.tmpl'

export class Header extends Block {
    private static className = 'messages__header'
    private static emptyLogin = 'введите логин (id)'
    private dropdownDtn: HTMLButtonElement | null
    private modal: HTMLElement | null

    constructor() {
        super('div', {
            className: Header.className
        })
    }

    componentDidMount(): void {
        this.handleWindowClick = this.handleWindowClick.bind(this)
        this.handleDropdownBtnClick = this.handleDropdownBtnClick.bind(this)

        window?.addEventListener('click', this.handleWindowClick)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleWindowClick)
    }

    handleWindowClick(event: { target: any }) {
        if (
            !event.target.classList.contains('dropdown__btn') &&
            !event.target.classList.contains('dropdown__btn-icon')
        ) {
            this.dropdownDtn?.classList.remove('dropdown__btn--active')
        }
    }

    componentDidRender(): void {
        this.dropdownDtn = this.element.querySelector('.dropdown__btn')
        ;(this.dropdownDtn as HTMLButtonElement).onclick = () =>
            this.dropdownDtn?.classList.add('dropdown__btn--active')

        const addUser = this.element.querySelector('[data-modal="#add-user"]')
        const deleteUser = this.element.querySelector('[data-modal="#delete-user"]')

        ;(addUser as HTMLButtonElement).onclick = this.handleDropdownBtnClick
        ;(deleteUser as HTMLButtonElement).onclick = this.handleDropdownBtnClick
    }

    handleDropdownBtnClick(event: { currentTarget: any }) {
        this.modal = document.querySelector(event.currentTarget.dataset.modal)
        const parent = this.modal?.closest('.modal')
        parent?.classList.add('modal--active')

        if (!this.modal) {
            return
        }

        this.modal.onsubmit = async (event: MouseEvent) => {
            event.preventDefault()

            const input = this.modal?.querySelector('input')
            const errorField = this.modal?.querySelector('.form__error')

            const login = input?.value
            const method = this?.modal?.dataset?.method
            const chatId = this.state.get('activeChat.chatId')

            if (!login || login === '') {
                ;(errorField as HTMLInputElement).textContent = Header.emptyLogin
                return
            }

            try {
                const hasError = await ActiveChatController.updateActiveChat(method, {
                    login,
                    chatId
                })

                if (hasError) {
                    ;(errorField as HTMLElement).textContent = hasError
                    return
                }

                parent?.classList.remove('modal--active')
                ;(input as HTMLInputElement).value = ''
                ;(errorField as HTMLElement).textContent = ''
            } catch (errorText) {
                ;(errorField as HTMLElement).textContent = errorText
            }
        }
    }

    render() {
        const title = this.state.get('activeChat.title', '')

        return templator(template)({
            title
        })
    }
}
