import { HTTP } from '../utils/http/index.js'
import { BASE_API_URL } from '../constants.js'

import { BaseAPI } from './base-api.js'

const CHATS_URL = '/chats'

const chatAPIInstance = new HTTP(BASE_API_URL)

export class ChatAPI extends BaseAPI {
    create(data: any) {
        return chatAPIInstance.post(CHATS_URL, {
            withCredentials: true,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    request() {
        return chatAPIInstance.get(CHATS_URL, {
            withCredentials: true
        })
    }
}
