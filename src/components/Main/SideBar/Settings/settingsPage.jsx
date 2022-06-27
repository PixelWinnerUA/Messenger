import React, {useState} from 'react';
import {ChangeUserInfo, UploadImage} from "../../../../api/RestApi";
import "../../../../styles/Auth.scss"
import "../../../../styles/SettingsPage.scss"
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png";
import {Button, CircularProgress, FormControl, TextField} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";

const SettingsPage = ({UserInfo, DeleteUser, GetUserInfo}) => {

    const [values, setValues] = useState({
        image: null,
        changes: false,
        load: false,
    })
    const changeLocalState = (prop) => (value) => {
        setValues({...values, [prop]: value})
    }

    let schema = yup.object().shape({
        name: yup.string("Invalid name format").required("Name is Required").max(20, "The length of the name should not exceed 20 characters!"),
        email: yup.string("Invalid email format").email("Invalid email format").required("Email is Required"),
        password: yup.string().min(8, "Invalid password length"),
    });
    const formik = useFormik({
        initialValues: {
            name: UserInfo ? UserInfo.name : "",
            email: UserInfo ? UserInfo.email : "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: values => {
            ChangeUserInfo(values.name, values.email, values.password).then(() => {
                GetUserInfo()
                changeLocalState("changes")(false)
            })
        },
    });

    return (
        <div className="SettingsPage">

            {UserInfo ?
                <div className="UserInfo">
                    <img src={UserInfo.profileImage ? (UserInfo.profileImage.url) : (DefaultIcon)}
                         alt={DefaultIcon}/>
                    <div className="UsersInfo-Text">
                        <div className="Name">{UserInfo.name}</div>
                        <div className="UserName">{"@" + UserInfo.userName}</div>
                    </div>
                </div>
                :
                <div className="UserInfo-Preloader">
                    <CircularProgress/>
                </div>}


            {(!values.changes && UserInfo) &&
                <div>
                    {values.image ?
                        <div>
                            <div className="Preview-Changes">
                                <p>Profile changes preview:</p>
                                {UserInfo ?
                                    <div className="Preview-Changes-UserInfo">
                                        <img src={URL.createObjectURL(values.image)} style={{
                                            objectPosition: "center center",
                                            objectFit: "cover",
                                            height: 50,
                                            width: 50,
                                            margin: "0 10px 0 0",
                                            borderRadius: "50%"
                                        }} alt={DefaultIcon}/>
                                        <div style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                                            <div>{UserInfo.name}</div>
                                            <div style={{color: "darkgrey"}}>{"@" + UserInfo.userName}</div>
                                        </div>
                                    </div>
                                    :
                                    <div className="UserInfo-Preloader">
                                        <CircularProgress/>
                                    </div>}
                            </div>
                            <div className="Uploading-Tools">
                                <div className="item">
                                    <Button variant="contained" disabled={values.load}
                                            onClick={() => {
                                                changeLocalState("load")(true)
                                                UploadImage(values.image).then(() => {
                                                    GetUserInfo();
                                                    changeLocalState("load")(false);
                                                    changeLocalState("image")(null);
                                                })
                                            }}>
                                        Upload picture</Button>
                                </div>
                                <div className="item">
                                    <Button className="Cancel-Button" variant="contained"
                                            onClick={() => changeLocalState("image")(null)}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="item">
                            <Button variant="contained" component="label">
                                Choose a new picture
                                <input id="inputImage" style={{display: "none"}}
                                       type="file"
                                       accept="image/png, image/gif, image/jpeg"
                                       onChange={e => changeLocalState("image")(e.target.files[0])}/>
                            </Button>
                        </div>
                    }
                    <div className="item">
                        <Button variant="contained" onClick={() => changeLocalState("changes")(!values.changes)}>
                            Change profile info</Button>
                    </div>
                </div>}

            {(values.changes && UserInfo) &&
                <form className="Profile-Changes-Preview" onSubmit={formik.handleSubmit}>
                    <p className="Profile-Changes-Preview-Header">Changes preview</p>
                    <FormControl className="item" sx={{width: 250}}>
                        <TextField className="Custom-TextField"
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
                    <FormControl className="item" sx={{width: 250}}>
                        <TextField className="Custom-TextField"
                                   variant="outlined"
                                   id="email"
                                   name="email"
                                   label="Email"
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                                   error={formik.touched.email && Boolean(formik.errors.email)}
                                   helperText={formik.touched.email && formik.errors.email}
                        />
                    </FormControl>
                    <FormControl className="item" sx={{width: 250}}>
                        <TextField className="Custom-TextField"
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
                    <div>
                        <Button className="item" variant="contained" type="submit">Set changes</Button>
                        <Button className="Cancel-Button item" variant="contained"
                                onClick={() => changeLocalState("changes")(!values.changes)}>Cancel</Button>
                    </div>
                </form>
            }

            <div>
                <Button className="item" variant="contained" onClick={DeleteUser}>Log Out</Button>
            </div>
        </div>
    );
};

export default SettingsPage;