import {SetAuthActionCreator} from "./appReducer";

export const SetUserInfoActionCreator = (userInfoObject) => ({
    type: "SetUserInfo",
    userInfoObject
})
export const DeleteUserInfoActionCreator = () => ({
    type: "DeleteUserInfo"
})

export const DeleteUser = () => (dispatch) => {
    localStorage.removeItem("AUTH_TOKEN");
    dispatch(DeleteUserInfoActionCreator())
    dispatch(SetAuthActionCreator(false))
}

let initialState = {
    UserInfo: null, //profile info object
}

const SidebarReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SetUserInfo":
            return {
                ...state,
                UserInfo: action.userInfoObject
            }
        case "DeleteUserInfo":
            return {
                ...state,
                UserInfo: null
            }
        default:
            return state;
    }
};
export default SidebarReducer;