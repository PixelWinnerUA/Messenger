import {connect} from "react-redux";
import sidebar from "./sidebar";
import {GetUsers} from "../../../store/reducers/UsersReducer";
import {DeleteUser} from "../../../store/reducers/AppReducer";
import {GetPhoto} from "../../../store/reducers/SettingsReducer";


const mapStateToProps = (state) => {
    return {
        UsersList: state.UsersComponent.users,
        UserPhoto: state.SettingsComponent.UserPhoto
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
        GetUserPhoto: () => {
            dispatch(GetPhoto())
        }
    }
}


const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(sidebar);

export default SideBarContainer;