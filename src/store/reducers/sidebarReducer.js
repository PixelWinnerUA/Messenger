import {FetchCurrentUser} from "../../api/RestApi";
import {SetAuthActionCreator} from "./appReducer";

export const GetUserInfoActionCreator = (userInfoObject) => ({
    type: "GetUserInfo",
    userInfoObject
})
export const DeleteUserInfoActionCreator = () => ({
    type: "DeleteUserInfo"
})

export const fetchUserInfo = () => async (dispatch) => {
    let response = await FetchCurrentUser();
    if (response) {
        dispatch(GetUserInfoActionCreator(response))
    }
}

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
        case "GetUserInfo":
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