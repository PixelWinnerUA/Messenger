import React, {useState} from 'react';
import "../../styles/SignUp.scss"
import {NavLink} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {RegisterUser} from "../../api/RestApi";

const SignUp = ({IsAuthenticated}) => {
    const [load, setLoad] = useState(false);
    const [value, setValue] = useState({
        name: "",
        email: "",
        login: "",
        password: "",
        confirmPassword: "",
    });
    const OnInputChange = prop => e => setValue({
        ...value,
        [prop]: e.target.value
    });
    const validateForm = (name, email, login, password, confirmPassword) => {
        if (name.trim() === "") {
            toast.error("Name can't be empty!")
            setLoad(false);
            return false
        } else if (name.length >= 20) {
            toast.error("The length of the name should not exceed 20 characters!")
            setLoad(false);
            return false
            // } else if (!email.toLowerCase()
            //     .match(
            //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            //     toast.error("Invalid Email Format")
            //     setLoad(false);
            //     return false
        } else if (!login.match(/^[a-zA-Z]+$/)) {  //validation
            toast.error("Invalid login format")
            setLoad(false);
            return false;
        } else if (password.length < 8) {
            toast.error("Invalid password length")
            setLoad(false);
            return false
        } else if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            setLoad(false);
            return false
        }
        return true;
    }
    const handleSubmit = e => {
        e.preventDefault();
        setLoad(true);
        if (validateForm(value.name, value.email, value.login, value.password, value.confirmPassword)) {
            RegisterUser(value.name, value.login, value.password) //name, userName, password, photo
                .then(() => {
                    setLoad(false);
                    IsAuthenticated()
                })
        }
    }

    return (
        <div className="Auth-box-Container Gradient-Background">
            <form className="Auth-box" style={{gridTemplateRows: "auto 1fr 1fr 1fr 1fr 1fr"}}>
                <h1>Registration</h1>
                <input placeholder="Name" value={value.name} onChange={OnInputChange("name")}/>
                {/*<input placeholder="E-Mail" value={value.email} onChange={OnInputChange("email")}/>*/}
                <input placeholder="Login" value={value.login} onChange={OnInputChange("login")}/>
                <input placeholder="Password" type="password" value={value.password}
                       onChange={OnInputChange("password")}/>
                <input placeholder="Confirm Password" type="password" value={value.confirmPassword}
                       onChange={OnInputChange("confirmPassword")}/>
                <button disabled={load} onClick={handleSubmit} type="submit">Sign-up</button>
            </form>
            <div className="Auth-Link"><NavLink to={"/login"}>Sign-In</NavLink></div>
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

export default SignUp;