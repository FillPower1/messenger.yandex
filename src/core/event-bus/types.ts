export interface IEventBus {
    on(event: string, callback: () => void): () => void
    emit(event: string, args: any[]): void
}

type Func = (...args: any) => void

export type Listener = {
    [key: string]: Array<Func>
}

export type CallBackType = (...args: any) => any
