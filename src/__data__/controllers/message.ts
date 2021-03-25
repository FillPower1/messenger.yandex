import { ChatAPI } from '../../api/chat-api.js'
import { Block } from '../../core/block/index.js'
import { State } from '../state.js'
import { Events } from '../../core/block/types.js'

const chatApi = new ChatAPI()
const state = new State()

type Info = { chatId: string; login: string }

export class ActiveChatController {
    static Components: Block[] = []

    static subscribe(Components: Block): void {
        ActiveChatController.Components.push(Components)
    }

    static setActiveChat(title: string, chatId: string): void {
        state.set('chats.activeChat', {
            title,
            chatId
        })

        ActiveChatController.Components.forEach((Component) => (
            Component.eventBus.emit(Events.FLOW_RENDER))
        )
    }

    static updateActiveChat(method: string = '', info: Info = { login: '', chatId: '' }) {
        if (!method) {
            return 'Не передан метод обновления активного чата'
        }

        if (method === 'add') {
            return this.updateChat(info.login, info.chatId, 'update')
        } else {
            return this.updateChat(info.login, info.chatId, 'delete')
        }
    }

    static updateChat(user: string, chatId: string, method: 'update' | 'delete') {
        return chatApi[method](user, chatId)
            .then(({ response }) => {
                if (response !== 'OK') {
                    return 'Что-то пошло не так'
                }

                return ''
            })
            .catch(() => 'Что-то пошло не так')
    }
}
