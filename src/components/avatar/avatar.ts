import { BASE_URL } from '../../constants.js'
import { Block } from '../../core/block/block.js'
import { templator } from '../../utils/templator.js'
import { PersonalDataController } from '../../__data__/controllers/personal-data.js'

import template from './avatar.tmpl.js'

export class Avatar extends Block {
    private static className = 'profile__avatar'
    private modal: HTMLDivElement | null

    constructor(props?: any) {
        super('div', {
            ...props,
            className: Avatar.className
        })

        this.handleWindowClick = this.handleWindowClick.bind(this)
    }

    componentDidMount(): void {
        PersonalDataController.avatarSubscribe(this)
        window.addEventListener('click', this.handleWindowClick)
    }

    componentWillUnmount(): void {
        window.removeEventListener('click', this.handleWindowClick)
    }

    componentDidRender(): void {
        this.element.addEventListener('click', () => {
            this.modal = document.querySelector('.modal')
            this.modal?.classList.add('modal--active')
        })
    }

    handleWindowClick(event: any) {
        if (event.target?.classList.contains('modal')) {
            event.target?.classList.remove('modal--active')
        }
    }

    render() {
        this.modal?.classList.remove('modal--active')

        return templator(template)({
            baseUrl: BASE_URL,
            showBg: true,
            avatar: this.state.get('personalData.avatar', null),
            ...this.props
        })
    }
}
