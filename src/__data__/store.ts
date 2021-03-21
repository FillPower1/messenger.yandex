import { applyMiddleware } from '../core/redux/apply-middleware.js'
import { thunkMiddleware } from '../core/redux/thunk-middleware.js'
import { createStore } from '../core/redux/create-store.js'
import { AUTH_INIT } from './action-types.js'

import rootReducer from './reducers/index.js'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

const store = createStoreWithMiddleware(rootReducer, {})
const { dispatch, getState } = store

// костыль, надеюсь придумаю что-то получше
const auth = JSON.parse(localStorage.getItem('auth') || '{}')
store.dispatch({ type: AUTH_INIT, payload: auth })

// @ts-ignore: для дебага
window.store = store

class Store {
    private static __instance: Store

    static subscribe(callback: any) {
        return store.subscribe(callback)
    }

    static get dispatch() {
        return store.dispatch
    }

    static getState() {
        return store.getState()
    }

    constructor() {
        if (Store.__instance) {
            return Store.__instance
        }

        Store.__instance = this
    }
}

export {
    Store,
    dispatch,
    getState
}
