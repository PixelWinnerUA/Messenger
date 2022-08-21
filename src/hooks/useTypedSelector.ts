import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/redux-store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;