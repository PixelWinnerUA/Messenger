import {ActionsTypes} from "../store/redux-store";
import {SideBarActionsCreators} from "../store/reducers/sidebarReducer";
import {ImageObject} from "./apiTypes";

export type SidebarActionsCreatorsTypes = ActionsTypes<typeof SideBarActionsCreators>

export interface SideBarState {
    UserInfo: undefined | UserType,
    SideBarStatus: boolean,
}

export interface UserType {
    userName: string,
    name: string,
    email: string,
    profileImage: null | ImageObject,
    backgroundImage: null | ImageObject,
}

