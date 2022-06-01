import '../styles/App.scss';
import {useEffect} from "react";
import Login from "./Login";
import Main from "./Main";
import {Route, Routes, Navigate} from "react-router-dom";


function App(props) {

    const {GetAuthStatus, AuthStatus} = props;
    useEffect(() => { //On Did Mount
        GetAuthStatus()
    }, [])

    return (
        <Routes>
            <Route path="/" element={AuthStatus ? <Main/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={AuthStatus ? <Navigate to="/"/> : <Login IsAuthenticated={GetAuthStatus}/>}/>
        </Routes>
    )
}

export default App;
