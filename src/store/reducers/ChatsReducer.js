import {GetUserList} from "../../api/RestApi"

export const SetUsersActionCreator = (users) => ({
    type: "SetUsers",
    users
})
export const GetUsers = () => async (dispatch) => {
    let response = await GetUserList();
    if (response) {
        dispatch(SetUsersActionCreator(response))
    }
}

let initialState = {
    users: []
}

const ChatsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SetUsers":
            return {
                ...state,
                users: action.users
            }

        default:
            return state;
    }
};

export default ChatsReducer;