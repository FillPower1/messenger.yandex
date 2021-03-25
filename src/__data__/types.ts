export type Auth = {
    isAuthorized: boolean
    textError?: string
}

export type Chats = {
    chats: {
        title: string
        avatar: string | null
        created_by: number
        id: number
    }[]
}

export type PersonalData = {
    first_name: string
    second_name: string
    display_name: string
    avatar: string | null
    id: number
    phone: string | number
    email: string
    login: string
}
