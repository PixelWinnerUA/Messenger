import {SetAuthActionCreator} from "./appReducer";

export const SetUserInfoActionCreator = (userInfoObject) => ({
    type: "SET-USER-INFO",
    userInfoObject
})
export const DeleteUserInfoActionCreator = () => ({
    type: "DELETE-USER-INFO"
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
        case "SET-USER-INFO":
            return {
                ...state,
                UserInfo: action.userInfoObject
            }
        case "DELETE-USER-INFO":
            return {
                ...state,
                UserInfo: null
            }
        default:
            return state;
    }
};
export default SidebarReducer;