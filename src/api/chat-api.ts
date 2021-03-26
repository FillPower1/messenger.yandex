import { HTTP } from '../utils/http/index.js'
import { BASE_API_URL } from '../constants.js'

const CHATS_URL = '/chats'
const CHATS_USER_URL = '/chats/users'

const chatAPIInstance = new HTTP(BASE_API_URL)

export class ChatAPI {
    create(data: any) {
        return chatAPIInstance.post(CHATS_URL, {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    request() {
        return chatAPIInstance.get(CHATS_URL)
    }

    update(user: string, chatId: string) {
        return chatAPIInstance.put(CHATS_USER_URL, {
            data: JSON.stringify({
                users: [user],
                chatId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    delete(user: string, chatId: string) {
        return chatAPIInstance.delete(CHATS_USER_URL, {
            data: JSON.stringify({
                users: [user],
                chatId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
