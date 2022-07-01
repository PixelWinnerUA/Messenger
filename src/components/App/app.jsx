import '../../styles/App.scss';
import {lazy, Suspense, useEffect} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Preloader from "../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {IsAuthenticated} from "../../store/reducers/appReducer";
import {getAuthStatus} from "../../store/reducers/appSelector";

const SignUp = lazy(() => import ("../Auth/registration"));
const Login = lazy(() => import ("../Auth/login"));
const Main = lazy(() => import ("../Main/main"));
const Error404 = lazy(() => import ("../Error404/error404"));


const App = () => {
    const dispatch = useDispatch();
    const AuthStatus = useSelector(getAuthStatus)
    useEffect(() => {
        dispatch(IsAuthenticated())
    }, [AuthStatus, dispatch])

    return (<div className="App">
            <Suspense fallback={<Preloader/>}>
                <Routes>
                    <Route path="*" element={<Error404/>}/>
                    <Route path="/" element={AuthStatus ? <Main/> : <Navigate to="/login"/>}/>
                    <Route path="/login"
                           element={AuthStatus ? <Navigate to="/"/> : <Login/>}/>
                    <Route path="/sign-up"
                           element={AuthStatus ? <Navigate to="/"/> : <SignUp/>}/>
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
