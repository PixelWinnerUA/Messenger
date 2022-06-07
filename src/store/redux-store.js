import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import UsersReducer from "./reducers/UsersReducer";
import AppReducer from "./reducers/AppReducer";



let reducers = combineReducers({
    UsersComponent: UsersReducer,
    AppComponent: AppReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;