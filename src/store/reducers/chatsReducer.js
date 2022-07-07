export const SetCurrentChatActionCreator = (chat) => ({
    type: "SET-CURRENT-CHAT",
    chat
})

let initialState = {
   CurrentChat: null
}

const ChatsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET-CURRENT-CHAT":
            return {
                ...state,
                CurrentChat: action.chat
            }
        default:
            return state;
    }
};

export default ChatsReducer;