enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method: Methods
    data?: any
    headers?: object
    timeout?: number,
    withCredentials?: boolean
}

type OptionsWithoutMethod = Omit<Options, 'method'>

type StringIndexed = Record<string, any>

export function queryStringify(data: StringIndexed = {}, prefix = ''): string | never {
    if (typeof data !== 'object') {
        throw new Error('input must be an object')
    }

    return Object.entries(data).map(([key, value]) => {
        if (Array.isArray(data)) {
            key = `${prefix}[${key}]`
        } else if (typeof data === 'object') {
            key = (prefix ? `${prefix}[${key}]` : key)
        }

        if (typeof value === 'object') {
            return queryStringify(value, key)
        } else {
            return `${key}=${encodeURIComponent(value)}`
        }
    }).join('&')
}

export class HTTP {
    constructor(private readonly baseUrl: string) {
        this.baseUrl = baseUrl
    }

    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        const query = options?.data ? `?${queryStringify(options?.data)}` : ''
        return this.request(`${url}${query}`, { ...options, method: Methods.GET })
    }

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: Methods.POST })
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: Methods.PUT })
    }

    patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: Methods.PATCH })
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: Methods.DELETE })
    }

    request(url: string, options: Options = { method: Methods.GET }): Promise<XMLHttpRequest> {
        const { method, data, headers = {}, timeout = 5000 } = options

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open(method, `${this.baseUrl}${url}`)
            xhr.timeout = timeout
            xhr.withCredentials = true

            Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value))

            xhr.onload = () => resolve(xhr)

            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            if (method === Methods.GET || !data) {
                xhr.send()
            } else {
                xhr.send(data)
            }
        })
    }
}
