import {AppActionsCreators} from "./appReducer";
import {BaseThunk} from "../redux-store";
import {AppActionsCreatorsTypes} from "../../types/appReducerTypes";
import {SidebarActionsCreatorsTypes, SideBarState, UserType} from "../../types/sidebarReducerTypes";

export const SideBarActionsCreators = {
    SetUserInfoActionCreator: (userInfoObject: UserType) => ({
        type: "SET_USER_INFO",
        userInfoObject
    } as const),
    DeleteUserInfoActionCreator: () => ({
        type: "DELETE_USER_INFO"
    } as const),
    SetSideBarStatusActionCreator: (status: boolean) => ({
        type: "SET_SIDEBAR_STATUS",
        status
    } as const),
}


export const DeleteUser = (): BaseThunk<AppActionsCreatorsTypes | SidebarActionsCreatorsTypes> => (dispatch) => {
    localStorage.removeItem("AUTH_TOKEN");
    dispatch(SideBarActionsCreators.DeleteUserInfoActionCreator())
    dispatch(AppActionsCreators.SetAuthActionCreator(false))
}

let initialState: SideBarState = {
    UserInfo: undefined, //profile info object
    SideBarStatus: false,
}

const SidebarReducer = (state = initialState, action: SidebarActionsCreatorsTypes): SideBarState => {

    switch (action.type) {
        case "SET_USER_INFO":
            return {
                ...state,
                UserInfo: action.userInfoObject
            }
        case "DELETE_USER_INFO":
            return {
                ...state,
                UserInfo: undefined
            }
        case "SET_SIDEBAR_STATUS":
            return {
                ...state,
                SideBarStatus: action.status
            }
        default:
            return state;
    }
};
export default SidebarReducer;