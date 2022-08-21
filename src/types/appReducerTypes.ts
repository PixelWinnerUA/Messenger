import {ActionsTypes} from "../store/redux-store";
import {AppActionsCreators} from "../store/reducers/appReducer";
import {HubConnection} from "@microsoft/signalr";

export type AppActionsCreatorsTypes = ActionsTypes<typeof AppActionsCreators>

export type ChatConnection = undefined | HubConnection;

export interface AppState {
    AuthStatus: boolean,
    ChatConnection: ChatConnection,
}
