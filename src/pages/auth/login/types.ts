export type EventType = {
    preventDefault: () => void,
    target: HTMLFormElement
}

export type FormItemsType = {
    name: string,
    placeholder?: string,
    type?: string
}
