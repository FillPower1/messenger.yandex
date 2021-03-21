import { dom } from '../../utils/render.js'
import { Block } from '../block/index.js'

export class Route {
    private _pathname: string | string[]
    private readonly _blockClass: any
    private _block: Block
    private _props: { rootQuery: string }

    constructor(pathname: string | string[], view: any, props: { rootQuery: string }) {
        this._pathname = pathname
        this._blockClass = view
        this._props = props
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname
            this.render()
        }
    }

    unmount() {
        this._block.hide()
        this._block.props.components?.forEach((Component) => Component.hide())
    }

    leave() {
        if (this._block) {
            this.unmount()
            dom(this._props.rootQuery).remove()
        }
    }

    match(pathname: string) {
        if (Array.isArray(this._pathname)) {
            return this._pathname.includes(pathname)
        }

        return pathname === this._pathname
    }

    render() {
        this._block = new this._blockClass()
        dom(this._props.rootQuery).render(this._block)
    }
}
