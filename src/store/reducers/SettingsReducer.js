import {GetUserImage} from "../../api/RestApi";

export const GetUserPhotoActionCreator = (photo) => ({
    type: "GetUserPhoto",
    photo
})

export const GetPhoto = () => async (dispatch) => {
    let response = await GetUserImage();
    if (response) {
        dispatch(GetUserPhotoActionCreator(response))
    }
}

let initialState = {
    UserPhoto: null
}

const SettingsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GetUserPhoto":
            return {
                ...state,
                UserPhoto: action.photo
            }

        default:
            return state;
    }
};
export default SettingsReducer;