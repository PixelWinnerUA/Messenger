import '../styles/App.scss';
import {useState, useEffect} from "react";
import Login from "./Login";
import Main from "./Main";


function App() {
    const [Auth, setAuth] = useState(false);
    const IsAuthenticated = () => {
        if (localStorage.AUTH_TOKEN)
            setAuth(true)
    }
    useEffect(() => { //On Did Mount
        IsAuthenticated()
    }, [])

    return (
        Auth ?
            <Main/>
            :
            <Login IsAuthenticated={IsAuthenticated}/>
    )
}

export default App;
