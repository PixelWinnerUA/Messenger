import '../../styles/App.scss';
import React, {lazy, Suspense, useEffect, useContext} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Preloader from "../Preloader/Preloader";
import {IsAuthenticated} from "../../store/reducers/appReducer";
import {getAuthStatus} from "../../store/reducers/appSelector";
import {ThemeContext} from "../../context/ThemeContext";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useTypedDispatch} from "../../hooks/useTypedDispatch";

const SignUp = lazy(() => import ("../Auth/registration"));
const Login = lazy(() => import ("../Auth/login"));
const Main = lazy(() => import ("../Main/main"));
const Error404 = lazy(() => import ("../Error404/error404"));


const App = () => {
    const {theme} = useContext(ThemeContext)
    const dispatch = useTypedDispatch();
    const AuthStatus = useTypedSelector(getAuthStatus)

    useEffect(() => {
        dispatch(IsAuthenticated())
    }, [AuthStatus, dispatch])

    return (
        <div className={theme}>
            <div className="App">
                <Suspense fallback={<Preloader/>}>
                    <Routes>
                        <Route path="/*" element={AuthStatus ? <Main/> : <Navigate to="/login"/>}/>
                        <Route path="/login"
                               element={AuthStatus ? <Navigate to="/"/> : <Login/>}/>
                        <Route path="/sign-up"
                               element={AuthStatus ? <Navigate to="/"/> : <SignUp/>}/>
                        <Route path="*" element={<Error404/>}/>
                    </Routes>
                </Suspense>

                <ToastContainer
                    position="top-left"
                    theme="dark"
                    limit={2}
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover/>
            </div>
        </div>
    )
}

export default App;
