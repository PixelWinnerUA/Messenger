import {ActionsTypes} from "../store/redux-store";
import {ChatsActionsCreators} from "../store/reducers/chatsReducer"
import {ImageObject} from "./apiTypes";

export type ChatsActionsCreatorsTypes = ActionsTypes<typeof ChatsActionsCreators>

export interface ChatsState {
    CurrentChat: undefined | CurrentChat,
    ChatsList: Chat[],
    CurrentChatMessages: Message[]
}

export interface CurrentChat {
    otherName: string,
    otherProfileImage: null | { id: number, url: string, publicId: string },
    otherUserName: string,
    userName: undefined | string
}

export interface Message {
    id: number,
    senderUserName: string,
    sent: string,
    text: string
}

export interface Chat {
    id: number,
    lastMessage: string,
    messageStamp: string,
    otherName: string,
    otherProfileImage: null | ImageObject,
    otherUserName: string,
    senderUserName: string,
}



