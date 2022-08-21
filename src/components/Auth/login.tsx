import React from 'react';
import {LoginAPI} from "../../api/RestApi";
import "../../styles/Space-Background.scss"
import "../../styles/Auth.scss";
import {useFormik} from 'formik';
import {NavLink} from "react-router-dom";
import * as yup from 'yup';
import {Box, Button, FormControl, TextField} from "@mui/material";
import {IsAuthenticated} from "../../store/reducers/appReducer";
import {useMutation} from "react-query";
import {useTypedDispatch} from "../../hooks/useTypedDispatch";


const Login = () => {
    const dispatch = useTypedDispatch();
    const {mutate: fetchLogIn, isLoading} = useMutation(({
                                                             login,
                                                             password
                                                         }: { login: string, password: string }) => LoginAPI(login, password), {onSuccess: () => dispatch(IsAuthenticated())});
    let schema = yup.object().shape({
        login: yup.string().required("Login is Required").max(20, "The length of the login should not exceed 20 characters!"),
        password: yup.string().required("Password is Required").min(8, "Invalid password length"),
    });
    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: values => {
            fetchLogIn({login: values.login, password: values.password})
        },
    });


    return (
        <div className="Auth-Wrapper background-container">
            <div className="stars"></div>
            <div className="twinkling"></div>

            <Box className="Custom-Box">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="Auth-Header">Sign-In</h1>
                    <FormControl sx={{width: 250}}>
                        <TextField className="Custom-TextField"
                                   sx={{margin: "15px 0"}}
                                   variant="outlined"
                                   id="login"
                                   name="login"
                                   label="Login"
                                   value={formik.values.login}
                                   onChange={formik.handleChange}
                                   error={formik.touched.login && Boolean(formik.errors.login)}
                                   helperText={formik.touched.login && formik.errors.login}
                        />
                    </FormControl>
                    <FormControl sx={{width: 250}}>
                        <TextField className="Custom-TextField"
                                   sx={{margin: "15px 0"}}
                                   variant="outlined"
                                   id="password"
                                   label="Password"
                                   type="password"
                                   value={formik.values.password}
                                   onChange={formik.handleChange}
                                   error={formik.touched.password && Boolean(formik.errors.password)}
                                   helperText={formik.touched.password && formik.errors.password}
                        />
                    </FormControl>
                    <Button className="Custom-Auth-Button" sx={{margin: "10px 0 20px 0"}} variant="contained"
                            type="submit"
                            disabled={isLoading}
                    >Sign-In</Button>
                </form>
            </Box>
            <div className="Auth-link">
                <span>Don't have an account? </span>
                <NavLink to={"/sign-up"}>Sign-Up</NavLink>
            </div>
        </div>
    );
};

export default Login;