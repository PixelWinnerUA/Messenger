import {connect} from "react-redux";
import App from "./App";
import {IsAuthenticated} from "../store/reducers/AppReducer";

const mapStateToProps = (state) => {
    return {
        AuthStatus: state.AppComponent.AuthStatus
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetAuthStatus: () => {
            dispatch(IsAuthenticated())
        }
    }
}


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;