import {RootState} from "../redux-store";

export const getUserInfo = (state: RootState) => {
    return state.SideBarComponent.UserInfo;
}
export const getSideBarStatus = (state: RootState) => {
    return state.SideBarComponent.SideBarStatus;
}