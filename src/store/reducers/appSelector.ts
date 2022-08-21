import {RootState} from "../redux-store";

export const getAuthStatus = (state: RootState) => {
    return state.AppComponent.AuthStatus;
}
export const getChatConnection = (state: RootState) => {
    return state.AppComponent.ChatConnection;
}
