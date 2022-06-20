import {connect} from "react-redux";
import sidebar from "./sidebar";
import {GetUsers} from "../../../store/reducers/UsersReducer";
import {DeleteUser} from "../../../store/reducers/AppReducer";
import {GetUserInfo, SetSearchInput} from "../../../store/reducers/SideBarReducer";


const mapStateToProps = (state) => {
    return {
        UserInfo: state.SideBarComponent.UserInfo,
        SearchInput: state.SideBarComponent.SearchInput,
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
        },
        SetSearchInput: (input) => {
            dispatch(SetSearchInput(input))
        }

    }
}


const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(sidebar);

export default SideBarContainer;