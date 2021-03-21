export function isEmpty(value: any): boolean {
    if (
        value === null ||
        value === undefined ||
        typeof value === 'boolean' ||
        typeof value === 'number'
    ) {
        return true
    }

    if (Array.isArray(value)) {
        return !Boolean(value.length)
    } else if (typeof value === 'object') {
        return !Boolean(value.size || Object.keys(value).length)
    } else if (typeof value === 'string') {
        return !Boolean(value.length)
    }

    return false
}
