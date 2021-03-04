import { IEventBus, Listener, CallBackType } from './types.js'

export class EventBus implements IEventBus {
    listeners: Listener

    constructor() {
        this.listeners = {}
    }

    on(event: string, callback: CallBackType): () => void {
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

    emit(event: string, ...args: any): void {
        this.listeners[event].forEach((listener) => {
            listener(...args)
        })
    }
}
