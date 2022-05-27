import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import ChatsReducer from "./reducers/ChatsReducer";


let reducers = combineReducers({
    ChatsPage: ChatsReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;