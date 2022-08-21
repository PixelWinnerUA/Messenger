import {RootState} from "../store/redux-store";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const useTypedDispatch = useDispatch as () => ThunkDispatch<RootState, unknown, AnyAction>;

