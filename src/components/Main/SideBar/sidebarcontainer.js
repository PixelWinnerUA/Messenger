import {connect} from "react-redux";
import sidebar from "./sidebar";
import {GetUsers} from "../../../store/reducers/UsersReducer";
import {DeleteUser} from "../../../store/reducers/AppReducer";
import {GetUserInfo} from "../../../store/reducers/SettingsReducer";


const mapStateToProps = (state) => {
    return {
        UsersList: state.UsersComponent.users,
        UserInfo: state.SettingsComponent.UserInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SearchUsers: (input) => {
            dispatch(GetUsers(input))
        },
        DeleteUser: () => {
            dispatch(DeleteUser())
        },
        GetUserInfo: () => {
            dispatch(GetUserInfo())
        }
    }
}


const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(sidebar);

export default SideBarContainer;