import {connect} from "react-redux";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
        UsersList: state.UsersComponent.users,
        SearchStatus: state.UsersComponent.SearchStatus
    }
}

const UsersContainer = connect(mapStateToProps)(Users);

export default UsersContainer;