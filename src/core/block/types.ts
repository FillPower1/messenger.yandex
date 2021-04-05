import { Block } from './block'

export enum Events {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER = 'flow:render',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_CDR = 'flow:component-did-render'
}

export type Props<P = any> = P & {
    className: string
    events?: { [key: string]: (...args: any) => void }
    components?: Block[]
    [key: string]: any
}
