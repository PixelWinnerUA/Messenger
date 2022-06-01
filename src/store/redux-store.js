import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import ChatsReducer from "./reducers/ChatsReducer";
import AppReducer from "./reducers/AppReducer";



let reducers = combineReducers({
    ChatsComponent: ChatsReducer,
    AppComponent: AppReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;