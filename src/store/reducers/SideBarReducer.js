import {GetUser} from "../../api/RestApi";

export const GetUserInfoActionCreator = (userInfoObject) => ({
    type: "GetUserInfo",
    userInfoObject
})
export const SetSearchInputActionCreator = (input) => ({
    type: "SetSearchInput",
    input
})

export const SetSearchInput = (input) => (dispatch) => {
    dispatch(SetSearchInputActionCreator(input))
}

export const GetUserInfo = () => async (dispatch) => {
    let response = await GetUser();
    if (response) {
        dispatch(GetUserInfoActionCreator(response))
    }
}

let initialState = {
    UserInfo: null, //profile info object
    SearchInput: null, //search input in settingsbar
}

const SideBarReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GetUserInfo":
            return {
                ...state,
                UserInfo: action.userInfoObject
            }
        case "SetSearchInput":
            return {
                ...state,
                SearchInput: action.input
            }
        default:
            return state;
    }
};
export default SideBarReducer;