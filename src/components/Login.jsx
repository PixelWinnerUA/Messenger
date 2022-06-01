import React, {useState} from 'react';
import "../styles/Login.scss"
import {LogIn} from "../api/RestApi";


const Login = ({IsAuthenticated}) => {

    const [load, setLoad] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const OnLoginChange = e => setLogin(e.target.value);
    const OnPasswordChange = e => setPassword(e.target.value);

    return (
        <div className="Container">
            <div className="Auth-box">
                <h1>Login</h1>
                <input placeholder="Login" value={login} onChange={OnLoginChange}/>
                <input placeholder="Password" type="password" value={password} onChange={OnPasswordChange}/>
                <button disabled={load} onClick={() => {
                    setLoad(true);
                    LogIn(login, password)
                        .then(() => {
                            setLoad(false);
                            IsAuthenticated()
                        })
                }}>
                    Log In
                </button>
            </div>
            <div className="Sign-Up-Link">Sign-Up</div>
        </div>
    );
};

export default Login;