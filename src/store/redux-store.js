import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import AppReducer from "./reducers/appReducer";
import SidebarReducer from "./reducers/sidebarReducer";
import ChatsReducer from "./reducers/chatsReducer";


let reducers = combineReducers({
    AppComponent: AppReducer,
    SideBarComponent: SidebarReducer,
    ChatsComponent: ChatsReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;