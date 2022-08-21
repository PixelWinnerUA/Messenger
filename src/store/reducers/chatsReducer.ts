import {
    ChatsState,
    ChatsActionsCreatorsTypes,
    CurrentChat,
    Chat,
    Message
} from "../../types/chatsReducerTypes";

export const ChatsActionsCreators = {
    SetCurrentChatActionCreator: (chat: CurrentChat | undefined) => ({
        type: "SET_CURRENT_CHAT",
        chat
    } as const),
    SetCurrentChatMessagesActionCreator: (messages: Message[]) => ({
        type: "SET_CURRENT_CHAT_MESSAGES",
        messages
    } as const),
    UpdateCurrentChatMessagesActionCreator: (message: Message) => ({
        type: "UPDATE_CURRENT_CHAT_MESSAGES",
        message
    } as const),
    SetChatsListActionCreator: (list: Chat[]) => ({
        type: "SET_CHATS_LIST",
        list
    } as const),
    UpdateChatsActionCreator: (data: Chat) => ({
        type: "UPDATE_CHAT_LIST",
        data
    } as const),
    UpdateChatUserImageActionCreator: (data: Chat) => ({
        type: "UPDATE_CHAT_USER_IMAGE",
        data
    } as const)
}

let initialState: ChatsState = {
    CurrentChat: undefined,
    ChatsList: [],
    CurrentChatMessages: []
}


const ChatsReducer = (state = initialState, action: ChatsActionsCreatorsTypes): ChatsState => {

    switch (action.type) {
        case "SET_CURRENT_CHAT":
            return {
                ...state,
                CurrentChat: action.chat
            }
        case "SET_CHATS_LIST":
            return {
                ...state,
                ChatsList: action.list
            }
        case "UPDATE_CHAT_LIST":
            //переделай на find если возможно
            let newChatList: Chat[];
            if (state.ChatsList.length === 0) {
                newChatList = [{
                    id: action.data.id,
                    lastMessage: action.data.lastMessage,
                    messageStamp: action.data.messageStamp,
                    otherName: action.data.otherName,
                    otherProfileImage: action.data.otherProfileImage,
                    otherUserName: action.data.otherUserName,
                    senderUserName: action.data.senderUserName
                }]
                return {
                    ...state,
                    ChatsList: newChatList
                }
            } else if (state.ChatsList.length !== 0) {
                newChatList = state.ChatsList.filter(chat => chat.id !== action.data.id);

                newChatList = [{
                    id: action.data.id,
                    lastMessage: action.data.lastMessage,
                    messageStamp: action.data.messageStamp,
                    otherName: action.data.otherName,
                    otherProfileImage: action.data.otherProfileImage,
                    otherUserName: action.data.otherUserName,
                    senderUserName: action.data.senderUserName
                }, ...newChatList]
                return {
                    ...state,
                    ChatsList: newChatList
                }
            } else return state;

        case "UPDATE_CHAT_USER_IMAGE":
            if (action.data.otherUserName === state.CurrentChat?.otherUserName && action.data.otherProfileImage?.url !== state.CurrentChat.otherProfileImage?.url) {
                return {
                    ...state,
                    CurrentChat: {
                        ...state.CurrentChat,
                        otherName: action.data.otherName,
                        otherProfileImage: action.data.otherProfileImage,
                        otherUserName: action.data.otherUserName,
                    }
                }
            } else return state;
        case "SET_CURRENT_CHAT_MESSAGES":
            return {
                ...state,
                CurrentChatMessages: action.messages
            }
        case "UPDATE_CURRENT_CHAT_MESSAGES":
            if (state.CurrentChat?.otherUserName === action.message.senderUserName || state.CurrentChat?.userName === action.message.senderUserName) {
                return {
                    ...state,
                    CurrentChatMessages: [...state.CurrentChatMessages, action.message]
                }
            } else return state;

        default:
            return state;
    }
};

export default ChatsReducer;