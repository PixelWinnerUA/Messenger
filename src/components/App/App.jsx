import '../../styles/App.scss';
import {lazy, Suspense, useEffect} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Preloader from "../Preloader/Preloader";

const SignUp = lazy(() => import ("../Auth/SignUp"));
const Login = lazy(() => import ("../Auth/Login"));
const Main = lazy(() => import ("../Main/Main"));
const Error404 = lazy(() => import ("../Error404/Error404"));


function App({GetAuthStatus, AuthStatus}) {
    useEffect(() => { //On Did Mount
        GetAuthStatus()
    }, [AuthStatus, GetAuthStatus])

    return (<div className="App">
            <Suspense fallback={<Preloader/>}>
                <Routes>
                    <Route path="*" element={<Error404/>}/>
                    <Route path="/" element={AuthStatus ? <Main/> : <Navigate to="/login"/>}/>
                    <Route path="/login"
                           element={AuthStatus ? <Navigate to="/"/> : <Login IsAuthenticated={GetAuthStatus}/>}/>
                    <Route path="/sign-up"
                           element={AuthStatus ? <Navigate to="/"/> : <SignUp IsAuthenticated={GetAuthStatus}/>}/>
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

    )
}

export default App;
