import React, {useState} from 'react';
import "../styles/Login.scss"
import {LogIn} from "../api/RestApi";

const Login = ({IsAuthenticated}) => {

    const [load, setLoad] = useState(false);
    const [value, setValue] = useState({
        login: "",
        password: ""
    })
    const OnInputChange = prop => e => setValue({
        ...value,
        [prop]: e.target.value
    });

    return (
        <div className="Container">
            <div className="Auth-box">
                <h1>Login</h1>
                <input placeholder="Login" value={value.login} onChange={OnInputChange("login")}/>
                <input placeholder="Password" type="password" value={value.password}
                       onChange={OnInputChange("password")}/>
                <button disabled={load} onClick={() => {
                    setLoad(true);
                    LogIn(value.login, value.password)
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