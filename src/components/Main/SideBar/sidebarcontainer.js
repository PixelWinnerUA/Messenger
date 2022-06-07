import {connect} from "react-redux";
import sidebar from "./sidebar";
import {GetUsers} from "../../../store/reducers/UsersReducer";
import {IsAuthenticated} from "../../../store/reducers/AppReducer";


const mapStateToProps = (state) => {
    return {
        UsersList: state.UsersComponent.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SearchUsers: (input) => {
            dispatch(GetUsers(input))
        },
        GetAuthStatus: () => {
            dispatch(IsAuthenticated())
        }
    }
}


const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(sidebar);

export default SideBarContainer;