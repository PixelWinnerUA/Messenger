import {connect} from "react-redux";
import chats from "./chats";
import {GetUsers} from "../store/reducers/ChatsReducer";


const mapStateToProps = (state) => {
    return {
        ChatsList: state.ChatsPage.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetUsers: () => {
            dispatch(GetUsers())
        }
    }
}


const Chatscontainer = connect(mapStateToProps, mapDispatchToProps)(chats);

export default Chatscontainer;