import React, {useState} from 'react';
import {LoginAPI} from "../../api/RestApi";
import "../../styles/GradientBackground.scss"
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
             style={{width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>

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
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    gridTemplateRows: "auto auto auto auto"
                }}>
                    <h1 style={{margin: "1.5vh 0 1.5vh 0", color: "white"}}>Sign-In</h1>
                    <FormControl sx={{width: 250}}>
                        <TextField
                            sx={{
                                margin: "1.5vh 0 1.5vh 0",
                                '& label': {
                                    color: "rgba(255, 255, 255, 0.7)",
                                },
                                '&:hover label': {
                                    color: "#006ac0",
                                },
                                '& label.Mui-focused': {
                                    color: "#006ac0",
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: "#006ac0",
                                },
                                '& .MuiOutlinedInput-root': {
                                    color: "#fff",
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.7)',
                                        borderWidth: 2
                                    },
                                    '&:hover fieldset': {
                                        borderColor: "#006ac0",
                                        borderWidth: 2
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: "#006ac0",
                                    },
                                },
                            }}
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
                        <TextField
                            sx={{
                                margin: "1.5vh 0 1.5vh 0",
                                '& label': {
                                    color: "rgba(255, 255, 255, 0.7)",
                                },
                                '&:hover label': {
                                    color: "#006ac0",
                                },
                                '& label.Mui-focused': {
                                    color: "#006ac0",
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: " '#006ac0'",
                                },
                                '& .MuiOutlinedInput-root': {
                                    color: "#fff",
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.7)',
                                        borderWidth: 2
                                    },
                                    '&:hover fieldset': {
                                        borderColor: "#006ac0",
                                        borderWidth: 2
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: "#006ac0",
                                    },
                                    'input::-ms-reveal': {
                                        display: "none"
                                    },
                                    'input::-ms-clear': {
                                        display: "none"
                                    },

                                },
                            }}
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
                    <Button variant="contained" type="submit" disabled={load}
                            sx={{
                                width: 100,
                                alignSelf: "center",
                                margin: "1.5vh 0 1.5vh 0",
                                color: "#fff",
                                '&:hover': {
                                    backgroundColor: "#0069d9",
                                    borderColor: "#0062cc",
                                    boxShadow: "none",
                                },
                                '&:active': {
                                    boxShadow: "none",
                                    backgroundColor: "#0062cc",
                                    borderColor: "#005cbf",
                                },
                                '&:disabled': {
                                    backgroundColor: "#003983",
                                }
                            }}>Sign-In</Button>
                </form>
                <div style={{color: "white", textAlign: "center", margin: "0 0 1.5vh 0"}}>
                    <span>Don't have an account?</span> <NavLink style={{color: "#1976d2", textDecoration: "none"}}
                                                                 to={"/sign-up"}>Sign-Up</NavLink>
                </div>
            </Box>
        </div>
    );
};

export default Login;