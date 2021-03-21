export function applyMiddleware(middleware: any) {
    return function createStoreWithMiddleware(createStore: any) {
        return (reducer: any, state: any) => {
            const store = createStore(reducer, state)

            return {
                dispatch: (action: any) => middleware(store)(store.dispatch)(action),
                getState: store.getState,
                subscribe: store.subscribe
            }
        }
    }
}
