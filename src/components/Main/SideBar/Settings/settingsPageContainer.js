import {connect} from "react-redux";
import settingsPage from "./settingsPage";
import {GetUserInfo} from "../../../../store/reducers/SideBarReducer";
import {DeleteUser} from "../../../../store/reducers/AppReducer";

const mapStateToProps = (state) => {
    return {
        UserInfo: state.SideBarComponent.UserInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetUserInfo: () => {
            dispatch(GetUserInfo())
        },
        DeleteUser: () => {
            dispatch(DeleteUser())
        }
    }
}

const SettingsPageContainer = connect(mapStateToProps, mapDispatchToProps)(settingsPage);

export default SettingsPageContainer;