import { ChatAPI } from '../../api/chat-api'
import { Block } from '../../core/block'
import { State } from '../state'
import { Events } from '../../core/block/types'
import { MessagesController } from './messages'

const chatApi = new ChatAPI()
const state = new State()
const messages = new MessagesController()

type Info = { chatId: string; login: string }

export class ActiveChatController {
    static Components: Block[] = []

    static subscribe(Components: Block): void {
        ActiveChatController.Components.push(Components)
    }

    static setActiveChat(title: string, chatId: string): void {
        if (state.get('activeChat.title', '') === title) {
            return
        }

        ActiveChatController.initChat(chatId)
            .then(({ token }) => {
                state.set('activeChat', {
                    title,
                    chatId,
                    token
                })

                const userId = state.get('personalData.id')
                messages.init(userId, chatId, token)

                chatApi.getCountUnreadMessages(chatId).then((res: any) => {
                    const result = JSON.parse(res.response)
                    state.set('unread_count', result?.unread_count)
                })

                ActiveChatController.Components.forEach((Component) =>
                    Component.eventBus.emit(Events.FLOW_RENDER)
                )
            })
            .catch((err) => console.error(err))
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

    static async updateChat(user: string, chatId: string, method: 'update' | 'delete') {
        try {
            const { response } = await chatApi[method](user, chatId)

            if (response !== 'OK') {
                return 'Что-то пошло не так'
            }

            return ''
        } catch (e) {
            return 'Что-то пошло не так'
        }
    }

    static async initChat(id: string) {
        try {
            const { response } = await chatApi.initChat(id)
            return JSON.parse(response)
        } catch (err) {
            return err
        }
    }
}
