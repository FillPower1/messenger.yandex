import { Block } from '../core/block/index'

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

type DomType = {
    render(page: Block): void
    remove(): void
}

export function dom(root: string): DomType {
    const container = document.querySelector(root)

    return {
        render(page: Block) {
            container?.appendChild(page.getContent())
        },
        remove() {
            if (container) {
                container.innerHTML = ''
            }
        }
    }
}
