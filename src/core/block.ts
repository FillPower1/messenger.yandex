import { EventBus } from '../__data__/index.js'

import { Events, Props } from './types.js'

export class Block {
    private _element: HTMLElement
    private readonly meta: { tagName: string, props: Props }
    eventBus: EventBus
    props: Props

    constructor(tagName: string = 'div', props: Props) {
        this.eventBus = new EventBus()

        this.meta = {
            tagName,
            props
        }

        this.props = this.makePropsProxy(props)

        this.registerEvents(this.eventBus)
        this.eventBus.emit(Events.INIT)
    }

    private registerEvents(eventBus: EventBus): void {
        eventBus.on(Events.INIT, this.init.bind(this))
        eventBus.on(Events.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Events.FLOW_RENDER, this._render.bind(this))
        eventBus.on(Events.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Events.FLOW_CDR, this._componentDidRender.bind(this))
    }

    private createResources(): void {
        const { tagName } = this.meta
        this._element = this._createDocumentElement(tagName)
    }

    init(): void {
        this.createResources()
        this.eventBus.emit(Events.FLOW_CDM)
    }

    private _componentDidMount(): void {
        this.componentDidMount(this.props)
        this.eventBus.emit(Events.FLOW_RENDER)
    }

    componentDidMount(oldProps = {}): void {}

    private _componentDidUpdate(oldProps: any, newProps: any): void {
        const response = this.componentDidUpdate(oldProps, newProps)

        if (JSON.stringify(oldProps) !== JSON.stringify(newProps) || response) {
            this.eventBus.emit(Events.FLOW_RENDER)
        }
    }

    componentDidUpdate(oldProps: any, newProps: any) {}

    private _componentDidRender(): void {
        this.componentDidRender()
    }

    componentDidRender(): void {}

    setProps = (nextProps: any): void => {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }

    private _addEvents(): void {
        const { events = {} } = this.props

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName])
        })
    }

    private _removeEvents(): void {
        const { events = {} } = this.props

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName, events[eventName])
        })
    }

    get element(): HTMLElement {
        return this._element
    }

    private _render(): void {
        const block = this.render()

        this._removeEvents()

        this._element.insertAdjacentHTML('afterbegin', block)

        this._addEvents()

        this.eventBus.emit(Events.FLOW_CDR)
    }

    render(): string {
        return ''
    }

    getContent(): HTMLElement {
        return this.element
    }

    private makePropsProxy(props: Props) {
        return new Proxy(props, {
            set: (target: Props, prop: string, value): boolean => {
                const oldProps = { ...target }
                target[prop] = value
                this.eventBus.emit(Events.FLOW_CDU, oldProps, target)
                return true
            }
        })
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        const { className } = this.props
        const el = document.createElement(tagName)
        el.classList.add(className)

        return el
    }

    show(): void {
        this.getContent().style.display = 'block'
    }

    hide(): void {
        this.getContent().style.display = 'none'
    }
}
