import { BASE_URL } from '../../constants.js'
import { Block } from '../../core/block/block.js'
import { templator } from '../../utils/templator.js'
import { getAvatar } from '../../__data__/selectors/personal-data.js'

import template from './avatar.tmpl.js'

export class Avatar extends Block {
    private static className = 'profile__avatar'
    private static modalClass = 'modal'
    private static modalActiveClass = 'modal--active'
    private modal: HTMLDivElement | null

    constructor(props?: any) {
        super('div', {
            ...props,
            className: Avatar.className
        })

        this.handleWindowClick = this.handleWindowClick.bind(this)
    }

    componentDidMount(): void {
        this.connectToStore(this)
        window.addEventListener('click', this.handleWindowClick)
    }

    componentWillUnmount(): void {
        window.removeEventListener('click', this.handleWindowClick)
    }

    componentDidRender(): void {
        this.element.addEventListener('click', () => {
            this.modal = document.querySelector(`.${Avatar.modalClass}`)
            this.modal?.classList.add(Avatar.modalActiveClass)
        })
    }

    handleWindowClick(event: any) {
        if (event.target?.classList.contains(Avatar.modalClass)) {
            event.target?.classList.remove(Avatar.modalActiveClass)
        }
    }

    mapStateToProps(store: any, ownProps?: any) {
        const avatar = getAvatar(store)

        return {
            avatar
        }
    }

    componentDidUpdate(oldProps?: any, newProps?: any): boolean {
        return oldProps !== newProps;
    }

    render() {
        this.modal?.classList.remove(Avatar.modalActiveClass)

        return templator(template)({
            baseUrl: BASE_URL,
            ...this.props
        })
    }
}
