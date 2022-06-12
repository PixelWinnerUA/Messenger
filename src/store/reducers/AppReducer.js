export const SetAuthActionCreator = (status) => ({
    type: "SET-AUTH",
    status
})

export const IsAuthenticated = () => (dispatch) => {
    if (localStorage.user) {
        dispatch(SetAuthActionCreator(true))
    } else {
        dispatch(SetAuthActionCreator(false))
    }
}

export const DeleteUser = () => (dispatch) => {
    localStorage.removeItem("user");
    dispatch(SetAuthActionCreator(false))
}

let initialState = {
    AuthStatus: false
}

const AppReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET-AUTH":
            return {
                ...state,
                AuthStatus: action.status
            }
        default:
            return state;
    }
};

export default AppReducer;