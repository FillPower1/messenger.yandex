import { Action } from './types'

export function combineReducers(reducersMap: object) {
    return function combinationReducer(state: any = {}, action: Action) {
        // не понял как типизировать memo, типизация ключей это моя проблема
        return Object.entries(reducersMap).reduce((memo: any, [key, reducer]) => {
            memo[key] = reducer(state[key], action)
            return memo
        }, {})
    }
}
