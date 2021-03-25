import { ChatAPI } from '../../api/chat-api.js'
import { Block } from '../../core/block/index.js'
import { State } from '../state.js'
import { Events } from '../../core/block/types.js'

const chatApi = new ChatAPI()
const state = new State()

type CreateChatData = {
    title?: string
}

type CreateChatErrorDto = { error: string, reason: string }

export class ChatsController {
    static Page: Block

    static subscribe(ChatsPage: Block): void {
        ChatsController.Page = ChatsPage
    }

    static getChats(): void {
        chatApi.request()
            .then((chatList) => {
                const chats = JSON.parse(chatList.response)
                state.set('chats', chats)

                ChatsController.Page.eventBus.emit(Events.FLOW_RENDER)
            })
            .catch((err) => console.error(err))
    }

    static createChat(data: CreateChatData): Promise<CreateChatErrorDto | void> {
        return chatApi.create(data)
            .then(({ response }) => {
                const result = JSON.parse(response)

                if (result?.id) {
                    ChatsController.getChats()
                    return
                }

                return result
            })
            .catch((err) => console.error(err))
    }
}
