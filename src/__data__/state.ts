import { Auth, Chats, PersonalData } from './types.js'

type Indexed<T = unknown> = {
    [key in string]: T
}

type StateType = {
    auth: Auth
    chats: Chats
    personalData: PersonalData
} | {} | any

export class State {
    private static __instance: State
    state: StateType = {}

    constructor() {
        if (State.__instance) {
            return State.__instance
        }

        State.__instance = this
    }

    set(path: string, value: unknown): Indexed | unknown {
        const keys = path.split('.')

        const result = keys.reduceRight((memo, key) => ({ [key]: memo }), value)

        return Object.assign(this.state, result)
    }

    get(path: string, defaultValue: any = {}) {
        const keys = path.split('.')

        let result = this.state
        for (let key of keys) {
            result = result[key]

            if (result === undefined) {
                return defaultValue
            }
        }

        return result ?? defaultValue
    }
}
