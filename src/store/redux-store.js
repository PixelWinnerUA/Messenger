import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import UsersReducer from "./reducers/usersReducer";
import AppReducer from "./reducers/appReducer";
import SidebarReducer from "./reducers/sidebarReducer";


let reducers = combineReducers({
    UsersComponent: UsersReducer,
    AppComponent: AppReducer,
    SideBarComponent: SidebarReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;