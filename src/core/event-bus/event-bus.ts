import { IEventBus, Listener, CallBackType } from './types'

export class EventBus implements IEventBus {
    listeners: Listener

    constructor() {
        // с такой реализацией Block нельзя делать EventBus синглтоном,
        // т.к каждый компонент вызывает render и мы всегда уходим в бесконечный цикл
        // с наставником смотрели эту проблему, если делать синглтоном, многие моменты нужно пересматривать
        // я использовал решение из практикума, реализацию компонента Block
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
