export const SetCurrentChatActionCreator = (chat) => ({
    type: "SET-CURRENT-CHAT",
    chat
})
export const SetCurrentChatMessagesActionCreator = (messages) => ({
    type: "SET-CURRENT-CHAT-MESSAGES",
    messages
})
export const UpdateCurrentChatMessagesActionCreator = (message) => ({
    type: "UPDATE-CURRENT-CHAT-MESSAGES",
    message
})

export const SetChatsListActionCreator = (list) => ({
    type: "SET-CHATS-LIST",
    list
})
export const UpdateChatsActionCreator = (data) => ({
    type: "UPDATE-CHAT-LIST",
    data
})

export const UpdateChatUserImageActionCreator = (data) => ({
    type: "UPDATE-CHAT-USER-IMAGE",
    data
})

let initialState = {
    CurrentChat: null,
    ChatsList: [],
    CurrentChatMessages: []
}

const ChatsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET-CURRENT-CHAT":
            return {
                ...state,
                CurrentChat: action.chat
            }
        case "SET-CHATS-LIST":
            return {
                ...state,
                ChatsList: action.list
            }
        case "UPDATE-CHAT-LIST":
            //переделай на find
            let newChatList;
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
            }
            return {
                ...state,
                ChatsList: newChatList
            }
        case "UPDATE-CHAT-USER-IMAGE":
            if (action.data.otherUserName === state.CurrentChat?.otherUserName && action.data.otherProfileImage?.url !== state.CurrentChat.otherProfileImage?.url) {
                return {
                    ...state,
                    CurrentChat: {
                        ...state.CurrentChat,
                        id: action.data.id,
                        lastMessage: action.data.lastMessage,
                        messageStamp: action.data.messageStamp,
                        otherName: action.data.otherName,
                        otherProfileImage: action.data.otherProfileImage,
                        otherUserName: action.data.otherUserName
                    }
                }
            } else return state;
        case "SET-CURRENT-CHAT-MESSAGES":
            return {
                ...state,
                CurrentChatMessages: action.messages
            }
        case "UPDATE-CURRENT-CHAT-MESSAGES":
            if (state.CurrentChat.otherUserName === action.message.senderUserName || state.CurrentChat.userName === action.message.senderUserName) {
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