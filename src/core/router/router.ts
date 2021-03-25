import { Route } from './route.js'

export class Router {
    private static __instance: Router
    private readonly _rootQuery: string
    private _currentRoute: Route | null
    private _notFoundRoute = '/not-found'
    history: History
    routes: Route[]

    constructor(rootQuery: string = '#root') {
        if (Router.__instance) {
            return Router.__instance
        }

        this.routes = []
        this.history = window.history
        this._currentRoute = null
        this._rootQuery = rootQuery

        Router.__instance = this
    }

    use(pathname: string | string[], block: any) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery })

        this.routes.push(route)
        return this
    }

    start() {
        window.onpopstate = (event: any) => {
            this._onRoute(event.currentTarget.location.pathname)
        }

        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname)

        if (!route) {
            return this.go(this._notFoundRoute)
        }

        if (this._currentRoute) {
            this._currentRoute.leave()
        }

        this._currentRoute = route
        route.render()
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    private getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname))
    }
}
