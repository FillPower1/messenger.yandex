export type PlainObject<T = any> = {
    [k in string]: T
}

export function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    )
}

export function isArray(value: unknown): value is [] {
    return Array.isArray(value)
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value)
}

export function isFunction(value: unknown): boolean {
    return typeof value === 'function' && value.constructor === Function
}

export function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
    if (Object.keys(lhs)?.length !== Object.keys(rhs)?.length) {
        return false
    }

    return Object.keys(lhs).every((key) => {
        if (isArrayOrObject(lhs[key]) && isArrayOrObject(rhs[key])) {
            return isEqual(lhs[key], rhs[key])
        } else if (isFunction(lhs[key]) && isFunction(rhs[key])) {
            // @ts-ignore
            return lhs[key].toString() === rhs[key]?.toString()
        }

        return lhs[key] === rhs[key]
    })
}
