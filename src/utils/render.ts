import { Block } from '../core/block/index.js'

export function renderChild(
    parent: HTMLElement,
    components: Block[] = [],
    before: boolean = false
): void {
    if (before) {
        components.forEach((component) => {
            parent.insertAdjacentElement('afterbegin', component.getContent())
        })

        return void 0
    }

    components.forEach((component) => parent.appendChild(component.getContent()))
}

export function render(root: string, page: Block): void {
    const container = document.querySelector(root)
    container?.appendChild(page.getContent())
}
