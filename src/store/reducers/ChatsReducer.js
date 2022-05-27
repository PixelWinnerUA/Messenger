import {GetUserList} from "../../api/RestApi"

export const SendNewMessageActionCreator = (users) => ({
    type: "SetUsers",
    users
})
export const GetUsers = () => async (dispatch) => {
    let response = await GetUserList();
    if (response) {
        dispatch(SendNewMessageActionCreator(response))
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