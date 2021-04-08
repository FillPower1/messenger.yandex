const HOST = 'wss://ya-praktikum.tech/ws/chats'

interface IMessage {
    type: 'message' | 'user_connected' | 'file'
    content: string
    chat_id: number
    user_id: number
    is_read: boolean
    id: number
    time: string
}

export class MessagesController {
    static __instance: MessagesController
    socket: WebSocket

    constructor() {
        if (MessagesController.__instance) {
            return MessagesController.__instance
        }

        MessagesController.__instance = this
    }

    init(userId: string | number, chatId: string, token: string) {
        this.socket = new WebSocket(`${HOST}/${userId}/${chatId}/${token}`)

        this.socket.addEventListener('open', () => {
            this.send('0', 'get old')
        })
    }

    getOldMessages(id: string) {
        this.send(String(id), 'get old')
    }

    sortMessages(messages: IMessage[]) {
        return messages.sort((a: IMessage, b: IMessage) => {
            return new Date(a.time).getTime() - new Date(b.time).getTime()
        })
    }

    subscribe(fn: (messages: IMessage[]) => void) {
        this.socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data)

            if (Array.isArray(data)) {
                fn(this.sortMessages(data))
                return
            }

            if (data.type === 'message') {
                fn(this.sortMessages([data]))
            }
        })
    }

    send(content: string, type: string) {
        this.socket.send(
            JSON.stringify({
                content,
                type
            })
        )
    }
}
