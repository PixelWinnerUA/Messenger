import {RootState} from "../redux-store";

export const getCurrentChat = (state: RootState) => {
    return state.ChatsComponent.CurrentChat;
}
export const getChatsList = (state: RootState) => {
    return state.ChatsComponent.ChatsList;
}
export const getCurrentChatMessages = (state: RootState) => {
    return state.ChatsComponent.CurrentChatMessages;
}