import React from 'react';
import {NavLink} from "react-router-dom";
import {RegistrationAPI} from "../../api/RestApi";
import "../../styles/Space-Background.scss"
import "../../styles/Auth.scss";
import {Box, Button, FormControl, TextField} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import {IsAuthenticated} from "../../store/reducers/appReducer";
import {useMutation} from "react-query";
import {useTypedDispatch} from "../../hooks/useTypedDispatch";

const Registration = () => {
    const dispatch = useTypedDispatch();
    const {mutate: fetchSignIn, isLoading} = useMutation(({
                                                              name, login, email, password
                                                          }: { name: string, login: string, email: string, password: string }) => RegistrationAPI(name, login, email, password), {onSuccess: () => dispatch(IsAuthenticated())});
    let schema = yup.object().shape({
        name: yup.string().required("Name is Required").max(20, "The length of the name should not exceed 20 characters!"),
        login: yup.string().required("Login is Required").max(20, "The length of the login should not exceed 20 characters!"),
        email: yup.string().email("Invalid email format").required("Email is Required"),
        password: yup.string().required("Password is Required").min(8, "Invalid password length"),
        passwordConfirm: yup.string().required("Confirm the password").min(8, "Invalid password length")
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            login: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema: schema,
        onSubmit: values => {
            fetchSignIn({name: values.name, login: values.login, email: values.email, password: values.password})
        },
    });

    return (
        <div className="Auth-Wrapper background-container">
            <div className="stars"></div>
            <div className="twinkling"></div>

            <Box className="Custom-Box">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="Auth-Header">Sign-Up</h1>
                    <FormControl sx={{width: 250}}>
                        <TextField className="Custom-TextField"
                                   sx={{margin: "15px 0"}}
                                   variant="outlined"
                                   id="name"
                                   name="name"
                                   label="Name"
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   error={formik.touched.name && Boolean(formik.errors.name)}
                                   helperText={formik.touched.name && formik.errors.name}
                        />
                    </FormControl>
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
                                   id="email"
                                   name="email"
                                   label="Email"
                                   type="email"
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                                   error={formik.touched.email && Boolean(formik.errors.email)}
                                   helperText={formik.touched.email && formik.errors.email}
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
                    <FormControl sx={{width: 250}}>
                        <TextField className="Custom-TextField"
                                   sx={{margin: "15px 0"}}
                                   variant="outlined"
                                   id="passwordConfirm"
                                   label="Confirm Password"
                                   type="password"
                                   value={formik.values.passwordConfirm}
                                   onChange={formik.handleChange}
                                   error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                                   helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                        />
                    </FormControl>
                    <Button className="Custom-Auth-Button" sx={{margin: "10px 0 20px 0"}} variant="contained"
                            type="submit" disabled={isLoading}>Sign-Up</Button>
                </form>
            </Box>
            <div className="Auth-link">
                <span>Already have an account? </span>
                <NavLink to={"/login"}>Sign-In</NavLink>
            </div>
        </div>
    );
};

export default Registration;