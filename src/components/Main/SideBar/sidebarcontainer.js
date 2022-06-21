import {connect} from "react-redux";
import sidebar from "./sidebar";
import {GetUserInfo} from "../../../store/reducers/SideBarReducer";
import {GetUsers} from "../../../store/reducers/UsersReducer";
import {DeleteUser} from "../../../store/reducers/AppReducer";

const mapStateToProps = (state) => {
    return {
        UserInfo: state.SideBarComponent.UserInfo,
        UsersList: state.UsersComponent.users,
        SearchStatus: state.UsersComponent.SearchStatus
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetUserInfo: () => {
            dispatch(GetUserInfo())
        },
        SearchUsers: (input) => {
            dispatch(GetUsers(input))
        },
        DeleteUser: () => {
            dispatch(DeleteUser())
        }
    }
}

const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(sidebar);

export default SideBarContainer;