import { IEventBus, Listener, CallBackType } from './types'

export class EventBus implements IEventBus {
    listeners: Listener

    constructor() {
        this.listeners = {}
    }

    on<U>(event: string, callback: CallBackType<U>): () => void {
        if (!(event in this.listeners)) {
            this.listeners[event] = []
        }

        this.listeners[event].push(callback)

        return () => {
            this.listeners[event] = this.listeners[event].filter(
                (listener) => listener !== callback
            )
        }
    }

    emit<T = any>(event: string, ...args: T[]): void {
        this.listeners[event].forEach((listener) => {
            listener(...args)
        })
    }
}
