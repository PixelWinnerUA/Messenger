import {
    AppState,
    AppActionsCreatorsTypes,
    ChatConnection,
} from "../../types/appReducerTypes"
import {BaseThunk} from "../redux-store";


export const AppActionsCreators = {
    SetAuthActionCreator: (status: boolean) => ({
        type: "SET_AUTH",
        status
    } as const),
    SetChatsConnectionActionCreator: (connection: ChatConnection) => ({
        type: "SET_CHAT_CONNECTION",
        connection
    } as const),
}

export const IsAuthenticated = (): BaseThunk<AppActionsCreatorsTypes> => (dispatch) => {
    if (localStorage.AUTH_TOKEN) {
        dispatch(AppActionsCreators.SetAuthActionCreator(true))
    } else {
        dispatch(AppActionsCreators.SetAuthActionCreator(false))
    }
}

let initialState: AppState = {
    AuthStatus: false,
    ChatConnection: undefined,
}

const AppReducer = (state = initialState, action: AppActionsCreatorsTypes): AppState => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                AuthStatus: action.status
            }
        case "SET_CHAT_CONNECTION":
            return {
                ...state,
                ChatConnection: action.connection
            }
        default:
            return state;
    }
};

export default AppReducer;