import React, {useState} from 'react';
import {LoginAPI} from "../../api/RestApi";
import "../../styles/GradientBackground.scss"
import "../../styles/Auth.scss";
import {useFormik} from 'formik';
import {NavLink} from "react-router-dom";
import * as yup from 'yup';
import {Box, Button, FormControl, TextField} from "@mui/material";


const Login = ({IsAuthenticated}) => {
    const [load, setLoad] = useState(false);
    let schema = yup.object().shape({
        login: yup.string("Invalid login format").required("Login is Required").max(20, "The length of the login should not exceed 20 characters!"),
        password: yup.string().required("Password is Required").min(8, "Invalid password length"),
    });
    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: values => {
            setLoad(true);
            LoginAPI(values.login, values.password) //Auth
                .then(() => {
                    setLoad(false);
                    IsAuthenticated()
                })
        },
    });

    return (
        <div className="Gradient-Background"
             style={{
                 width: "100vw",
                 height: "100vh",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
                 flexDirection: "column"
             }}>

            <Box sx={{
                width: "fit-content",
                height: "fit-content",
                minWidth: 300,
                minHeight: 300,
                background: "#181818", //$background-color
                border: "#0f0f0f 1px solid", //$block-border
                borderRadius: 5,
            }}>
                <form onSubmit={formik.handleSubmit} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                   flexDirection: "column"
                }}>
                    <h1 style={{margin: "10px 0", color: "white"}}>Sign-In</h1>
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
                    <Button className="Custom-Auth-Button" sx={{margin: "10px 0 20px 0"}} variant="contained" type="submit"
                            disabled={load}
                    >Sign-In</Button>
                </form>
            </Box>
            <div style={{
                color: "white",
                textAlign: "center",
                margin: "15px 0 15px 0",
                background: "#181818", //$background-color
                border: "#0f0f0f 1px solid", //$block-border
                padding: 15,
                borderRadius: 15,
                width: "fit-content",
                height: "fit-content",
                minWidth: 300,
            }}>
                <span>Don't have an account?</span> <NavLink style={{color: "#1976d2", textDecoration: "none"}}
                                                             to={"/sign-up"}>Sign-Up</NavLink>
            </div>
        </div>
    );
};

export default Login;