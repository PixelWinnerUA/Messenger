import {GetUser} from "../../api/RestApi";

export const GetUserInfoActionCreator = (userInfoObject) => ({
    type: "GetUserInfo",
    userInfoObject
})

export const GetUserInfo = () => async (dispatch) => {
    let response = await GetUser();
    if (response) {
        dispatch(GetUserInfoActionCreator(response))
    }
}

let initialState = {
    UserInfo: null
}

const SettingsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GetUserInfo":
            return {
                ...state,
                UserInfo: action.userInfoObject
            }

        default:
            return state;
    }
};
export default SettingsReducer;