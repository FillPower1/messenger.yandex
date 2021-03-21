import { Action } from './types'

export const thunkMiddleware = (store: any) => (dispatch: Function) => (action: Action | Function) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState)
    }
    return dispatch(action)
}
