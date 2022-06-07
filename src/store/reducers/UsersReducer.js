import {SearchUsers} from "../../api/RestApi"

export const SearchUsersActionCreator = (users) => ({
    type: "SearchUsers",
    users
})

export const GetUsers = (input) => async (dispatch) => {
    let response = await SearchUsers(input);
    if (response) {
        dispatch(SearchUsersActionCreator(response))
    }
}

let initialState = {
    users: [],
}

const UsersReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SearchUsers":
            return {
                ...state,
                users: action.users
            }

        default:
            return state;
    }
};

export default UsersReducer;