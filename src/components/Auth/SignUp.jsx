import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {RegistrationAPI} from "../../api/RestApi";
import {Box, Button, FormControl, TextField} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";

const SignUp = ({IsAuthenticated}) => {
    const [load, setLoad] = useState(false);
    let schema = yup.object().shape({
        name: yup.string("Invalid name format").required("Name is Required").max(20, "The length of the name should not exceed 20 characters!"),
        login: yup.string("Invalid login format").required("Login is Required").max(20, "The length of the login should not exceed 20 characters!"),
        password: yup.string().required("Password is Required").min(8, "Invalid password length"),
        passwordConfirm: yup.string().required("Confirm the password").min(8, "Invalid password length")
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            login: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema: schema,
        onSubmit: values => {
            setLoad(true);
            RegistrationAPI(values.name, values.login, values.password) //Auth
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
                    gridTemplateRows: "auto auto auto auto auto"
                }}>
                    <h1 style={{margin: "1.5vh 0 1.5vh 0", color: "white"}}>Sign-Up</h1>
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
                            id="passwordConfirm"
                            label="Confirm Password"
                            type="password"
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                            helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                        />
                    </FormControl>
                    <Button variant="contained" type="submit" disabled={load}
                            sx={{
                                width: 100, alignSelf: "center", margin: "1.5vh 0 1.5vh 0",
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
                            }}>Sign-Up</Button>
                </form>
                <div style={{color: "white", textAlign: "center", margin: "0 0 1.5vh 0"}}>
                    <span>Already registered?</span> <NavLink style={{color: "#1976d2", textDecoration: "none"}}
                                                                 to={"/login"}>Sign-In</NavLink>
                </div>
            </Box>

        </div>
    );
};

export default SignUp;