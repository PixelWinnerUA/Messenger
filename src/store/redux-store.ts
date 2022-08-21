import {applyMiddleware, combineReducers, createStore, Action} from "redux";
import AppReducer from "./reducers/appReducer";
import SidebarReducer from "./reducers/sidebarReducer";
import ChatsReducer from "./reducers/chatsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk, {ThunkAction} from "redux-thunk";


let reducers = combineReducers({
    AppComponent: AppReducer,
    SideBarComponent: SidebarReducer,
    ChatsComponent: ChatsReducer,
})

export type BaseThunk<A extends Action, R = Promise<void> | void> = ThunkAction<R, RootState, unknown, A>;
export type RootState = ReturnType<typeof reducers>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>;

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

window.store = store;
export default store;