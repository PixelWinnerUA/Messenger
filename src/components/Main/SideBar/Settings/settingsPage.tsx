import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ChangeUserInfo, UploadBackgroundImage, UploadImage} from "../../../../api/RestApi";
import "../../../../styles/Auth.scss"
import "../../../../styles/SettingsPage.scss"
// @ts-ignore
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png";
import {Button, CircularProgress, FormControl, Switch, TextField} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import {DeleteUser} from "../../../../store/reducers/sidebarReducer";
import {useMutation} from "react-query";
import {ThemeContext} from "../../../../context/ThemeContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import {FastAverageColor} from 'fast-average-color';
import {UserType} from "../../../../types/sidebarReducerTypes";
import {ImageFile} from "../../../../types/apiTypes";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";

interface SettingsPagePropsType {
    refetchUserInfo: Function,
    UserInfo: undefined | UserType
}

interface ValuesTypes {
    image: ImageFile,
    backgroundImage: ImageFile,
    changes: boolean,
    backgroundImageIsDark: boolean
}

const SettingsPage = ({refetchUserInfo, UserInfo}: SettingsPagePropsType) => {

    const dispatch = useTypedDispatch();
    const {theme, changeTheme} = useContext(ThemeContext);
    //Values for edit profile form
    const [values, setValues] = useState<ValuesTypes>({
        image: null,
        backgroundImage: null,
        changes: false,
        backgroundImageIsDark: false
    })
    //Function for edit profile form variables
    const changeLocalState = (prop: keyof ValuesTypes) => (value: null | File | boolean) => {
        setValues({...values, [prop]: value})
    }

    const backgroundIsDark = useCallback((url: string) => {
        const fac = new FastAverageColor();
        fac.getColorAsync(url, {algorithm: 'dominant'}).then(color => {
            changeLocalState("backgroundImageIsDark")(color.isDark)
            console.log(color.isDark)
            return color.isDark
        })
    }, [])

    const {mutate: fetchNewImage, isLoading: newImageIsLoading} =
        useMutation(({image}: { image: ImageFile }) => UploadImage(image), {
            onSuccess: () => {
                refetchUserInfo()
                changeLocalState("image")(null);
            }
        })
    const {mutate: fetchNewUserInfo, isLoading: newUserInfoIsLoading} =
        useMutation(({
                         name,
                         email,
                         password
                     }: { name: string, email: string, password: string }) => ChangeUserInfo(name, email, password), {
            onSuccess: () => {
                refetchUserInfo()
                changeLocalState("changes")(false)
            }
        })
    const {mutate: fetchNewBackgroundImage, isLoading: newBackgroundImageIsLoading} =
        useMutation(({backgroundImage}: { backgroundImage: ImageFile }) => UploadBackgroundImage(backgroundImage), {
            onSuccess: () => {
                refetchUserInfo()
                changeLocalState("backgroundImage")(null)
            }
        })

    let schema = yup.object().shape({
        name: yup.string().required("Name is Required").max(20, "The length of the name should not exceed 20 characters!"),
        email: yup.string().email("Invalid email format").required("Email is Required"),
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
            fetchNewUserInfo({name: values.name, email: values.email, password: values.password})
        },
    });

    useEffect(() => {
        if (UserInfo?.backgroundImage?.url) {
            backgroundIsDark(UserInfo.backgroundImage.url)
        }
    }, [UserInfo?.backgroundImage?.url, backgroundIsDark])

    return (
        <div className="SettingsPage">

            {UserInfo ?
                <div className="UserInfo" style={UserInfo.backgroundImage ? {
                    background: `url(${UserInfo.backgroundImage.url}) no-repeat center center / cover`,
                } : undefined}>
                    <img src={UserInfo?.profileImage?.url ? UserInfo.profileImage.url : DefaultIcon}
                         alt={DefaultIcon}/>
                    <div className="UserInfo-Text">
                        <div className="Name"
                             style={UserInfo?.backgroundImage?.url ? (values.backgroundImageIsDark ? {color: "white"} : {color: "#000000"}) : undefined}>{UserInfo.name}</div>
                        <div className="UserName"
                             style={UserInfo?.backgroundImage?.url ? (values.backgroundImageIsDark ? {color: "darkgray"} : {color: "gray"}) : undefined}>{"@" + UserInfo.userName}</div>
                    </div>
                </div>
                :
                <div className="UserInfo-Preloader">
                    <CircularProgress/>
                </div>}

            {UserInfo ?
                <>
                    <div className="Change-Buttons">
                        {values.image ?
                            <div>
                                <div className="Preview-Changes">
                                    <p>Profile changes preview:</p>
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
                                </div>
                                <div className="Uploading-Tools">
                                    <div className="item">
                                        <Button variant="contained" disabled={newImageIsLoading}
                                                onClick={() => {
                                                    fetchNewImage({image: values.image})
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
                            <div className="item"><Button variant="contained" component="label">
                                Choose a new picture
                                <input id="inputImage" style={{display: "none"}}
                                       type="file"
                                       accept="image/png, image/gif, image/jpeg"
                                       onChange={e => changeLocalState("image")(e.target.files ? e.target.files[0] : null)}/>
                            </Button>
                            </div>
                        }

                        {values.changes ?
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
                                    <Button className="item" variant="contained" type="submit"
                                            disabled={newUserInfoIsLoading}>
                                        Set changes</Button>
                                    <Button className="Cancel-Button item" variant="contained"
                                            onClick={() => {
                                                changeLocalState("changes")(!values.changes);
                                                formik.values.name = UserInfo?.name;
                                                formik.values.email = UserInfo?.email;
                                                formik.values.password = "";
                                            }}>Cancel</Button>
                                </div>
                            </form>
                            :
                            <div className="item">
                                <Button variant="contained"
                                        onClick={() => changeLocalState("changes")(!values.changes)}>
                                    Change profile info</Button>
                            </div>
                        }

                        {values.backgroundImage ?
                            <div>
                                <div className="New-Background-Tools">
                                    <p>Background preview:</p>
                                    <img className="New-Background-Preview"
                                         src={URL.createObjectURL(values.backgroundImage)}
                                         style={{
                                             objectPosition: "no-repeat center center",
                                             objectFit: "cover"
                                         }} alt="backgroundImage"/>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%"
                                    }}>
                                        <div className="item">
                                            <Button variant="contained"
                                                    disabled={newBackgroundImageIsLoading}
                                                    onClick={() => fetchNewBackgroundImage({backgroundImage: values.backgroundImage})}>Upload</Button>
                                        </div>

                                        <div className="item">
                                            <Button className="Cancel-Button" variant="contained"
                                                    onClick={() => changeLocalState("backgroundImage")(null)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="item">
                                <Button variant="contained" component="label">
                                    Choose a new background
                                    <input id="inputImage" style={{display: "none"}}
                                           type="file"
                                           accept="image/png, image/gif, image/jpeg"
                                           onChange={e => changeLocalState("backgroundImage")(e.target.files ? e.target.files[0] : null)}/>
                                </Button>
                            </div>
                        }
                    </div>
                </>
                : null}


            <div className="Theme-Switch">
                <div className="Theme-Switch-Icon"> {theme === "theme-dark" ? <Brightness4Icon/> :
                    <BrightnessHighIcon/>}</div>
                <div className="Theme-Switch-Label">Night mode</div>
                <Switch
                    checked={theme === "theme-dark"}
                    onChange={() => changeTheme(theme === "theme-dark" ? "theme-light" : "theme-dark")}/>
            </div>

            <div>
                <Button className="item" variant="contained" onClick={() => dispatch(DeleteUser())}>Log Out</Button>
            </div>

        </div>
    );
};

export default React.memo(SettingsPage);