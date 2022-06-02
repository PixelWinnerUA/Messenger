import '../../styles/App.scss';
import {useEffect} from "react";
import Login from "../Auth/Login";
import Main from "../Main/Main";
import {Route, Routes, Navigate} from "react-router-dom";
import SignUp from "../Auth/SignUp";


function App(props) {

    const {GetAuthStatus, AuthStatus} = props;
    useEffect(() => { //On Did Mount
        GetAuthStatus()
        console.log("Auth Status: " + AuthStatus)
    }, [])

    return (
        <Routes>
            <Route path="/" element={AuthStatus ? <Main/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={AuthStatus ? <Navigate to="/"/> : <Login IsAuthenticated={GetAuthStatus}/>}/>
            <Route path="/sign-up" element={AuthStatus ? <Navigate to="/"/> : <SignUp/>}/>
        </Routes>
    )
}

export default App;
