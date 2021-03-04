export type MessageListTypes = {
    messages: {
        text?: string
        time?: string
        im?: boolean
        read?: boolean
        attach?: {
            image?: string
        }
        date?: string
    }[],
}
