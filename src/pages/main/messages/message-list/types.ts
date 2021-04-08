export interface IMessage {
    type: 'message' | 'user_connected'
    content: string
    chat_id: number
    user_id: number
    is_read: boolean
    id: number
    time: string
}
