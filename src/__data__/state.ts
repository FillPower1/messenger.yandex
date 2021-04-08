import { Auth, Chats, PersonalData } from './types'

type StateType =
    | {
          auth: Auth
          chats: Chats
          personalData: PersonalData
      }
    | {}
    | any

export class State {
    private static __instance: State
    state: StateType = {}

    constructor() {
        if (State.__instance) {
            return State.__instance
        }

        State.__instance = this
    }

    set(path: string, value: unknown) {
        const keys = path.split('.')

        const result = keys.reduceRight((memo, key) => ({ [key]: memo }), value)
        Object.assign(this.state, result)
    }

    get(path: string | string[], defaultValue: any = {}): any {
        if (Array.isArray(path)) {
            return path.map((item: string) => {
                return this.get(item)
            })
        }

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
