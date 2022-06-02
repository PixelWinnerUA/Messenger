import React, {useState} from 'react';
import "../../styles/Login.scss"
import {LogIn} from "../../api/RestApi";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink} from "react-router-dom";


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
    const validateForm = (login, password) => {
        if (!login.match(/^[a-zA-Z]+$/)) {  //validation
            toast.error("Invalid login format")
            setLoad(false);
            return false;
        } else if (password.length < 8) {
            toast.error("Invalid password length")
            setLoad(false);
            return false
        }
        return true;
    }
    const handleSubmit = e => {
        e.preventDefault();
        setLoad(true);
        if (validateForm(value.login, value.password)) {
            LogIn(value.login, value.password) //Auth
                .then(() => {
                    setLoad(false);
                    IsAuthenticated()
                })
        }
    }

    return (
        <div className="Auth-box-Container Gradient-Background">
            <form className="Auth-box" style={{gridTemplateRows: "auto 1fr 1fr 1fr"}}>
                <h1>Login</h1>
                <input placeholder="Login" value={value.login} onChange={OnInputChange("login")}/>
                <input placeholder="Password" type="password" value={value.password}
                       onChange={OnInputChange("password")}/>
                <button disabled={load} onClick={handleSubmit} type="submit">
                    Log In
                </button>
            </form>

            <div className="Auth-Link"><NavLink to={"/sign-up"}>Sign-Up</NavLink></div>

            <ToastContainer
                position="top-left"
                theme="dark"
                limit={1}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
        </div>
    );
};

export default Login;