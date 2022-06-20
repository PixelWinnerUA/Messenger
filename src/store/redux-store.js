import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import UsersReducer from "./reducers/UsersReducer";
import AppReducer from "./reducers/AppReducer";
import SideBarReducer from "./reducers/SideBarReducer";


let reducers = combineReducers({
    UsersComponent: UsersReducer,
    AppComponent: AppReducer,
    SideBarComponent: SideBarReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;