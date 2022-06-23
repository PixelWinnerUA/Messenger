import '../../styles/App.scss';
import {useEffect} from "react";
import Login from "../Auth/Login";
import Main from "../Main/Main";
import {Route, Routes, Navigate} from "react-router-dom";
import SignUp from "../Auth/SignUp";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App({GetAuthStatus, AuthStatus}) {
    useEffect(() => { //On Did Mount
        GetAuthStatus()
    }, [AuthStatus, GetAuthStatus])

    return (<div className="App">
            <Routes>
                <Route path="/" element={AuthStatus ? <Main/> : <Navigate to="/login"/>}/>
                <Route path="/login"
                       element={AuthStatus ? <Navigate to="/"/> : <Login IsAuthenticated={GetAuthStatus}/>}/>
                <Route path="/sign-up"
                       element={AuthStatus ? <Navigate to="/"/> : <SignUp IsAuthenticated={GetAuthStatus}/>}/>
            </Routes>

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
