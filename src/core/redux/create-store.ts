export function createStore(rootReducer: any, initialState: any = {}) {
    let state = rootReducer(initialState, { type: '__INIT__' })
    let subscribers: any[] = []

    return {
        getState() {
            return state
        },
        dispatch(action: any) {
            state = rootReducer(state, action)
            subscribers.forEach((subscriber) => subscriber(state))
        },
        subscribe(callback: any) {
            subscribers.push(callback)

            return () => {
                subscribers = subscribers.filter((subscriber) => subscriber !== callback)
            }
        }
    }
}
