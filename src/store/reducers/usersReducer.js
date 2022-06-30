import {SearchUsers} from "../../api/RestApi"

export const SearchUsersActionCreator = (users) => ({
    type: "SearchUsers",
    users
})

export const SetSearchStatusActionCreator = (status) => ({
    type: "SetSearchStatus",
    status
})

export const fetchUsers = (input) => async (dispatch) => {
    dispatch(SetSearchStatusActionCreator(true))
    let response = await SearchUsers(input)
    if (response) {
        dispatch(SetSearchStatusActionCreator(false))
        dispatch(SearchUsersActionCreator(response))
    }
}

let initialState = {
    users: [],
    SearchStatus: false, //loading status of getting users
}

const UsersReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SearchUsers":
            return {
                ...state,
                users: action.users
            }
        case "SetSearchStatus":
            return {
                ...state,
                SearchStatus: action.status
            }
        default:
            return state;
    }
};

export default UsersReducer;