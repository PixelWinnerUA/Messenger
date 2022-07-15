export const SetAuthActionCreator = (status) => ({
    type: "SET-AUTH",
    status
})
export const SetChatsConnectionActionCreator = (connection) => ({
    type: "SET-CHAT-CONNECTION",
    connection
})

export const SetSideBarStatusActionCreator = (status) => ({
    type: "SET-SIDEBAR-STATUS",
    status
})

export const IsAuthenticated = () => (dispatch) => {
    if (localStorage.AUTH_TOKEN) {
        dispatch(SetAuthActionCreator(true))
    } else {
        dispatch(SetAuthActionCreator(false))
    }
}

let initialState = {
    AuthStatus: false,
    ChatConnection: null,
    SideBarStatus: false,
}

const AppReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET-AUTH":
            return {
                ...state,
                AuthStatus: action.status
            }
        case "SET-CHAT-CONNECTION":
            return {
                ...state,
                ChatConnection: action.connection
            }
        case "SET-MESSAGES-CONNECTION":
            return {
                ...state,
                MessagesConnection: action.connection
            }
        case "SET-SIDEBAR-STATUS":
            return {
                ...state,
                SideBarStatus: action.status
            }
        default:
            return state;
    }
};

export default AppReducer;