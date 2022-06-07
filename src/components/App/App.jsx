import '../../styles/App.scss';
import {useEffect} from "react";
import Login from "../Auth/Login";
import Main from "../Main/Main";
import {Route, Routes, Navigate} from "react-router-dom";
import SignUp from "../Auth/SignUp";


function App({GetAuthStatus, AuthStatus}) {
    useEffect(() => { //On Did Mount
        GetAuthStatus()
    }, [])
    console.log(AuthStatus)

    return (
        <Routes>
            <Route path="/" element={AuthStatus ? <Main/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={AuthStatus ? <Navigate to="/"/> : <Login IsAuthenticated={GetAuthStatus}/>}/>
            <Route path="/sign-up"
                   element={AuthStatus ? <Navigate to="/"/> : <SignUp IsAuthenticated={GetAuthStatus}/>}/>
        </Routes>
    )
}

export default App;
