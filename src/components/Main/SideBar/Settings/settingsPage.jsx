import React, {useState} from 'react';
import {UploadImage} from "../../../../api/RestApi";
import "../../../../styles/SettingsPage.scss"
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png";
import {Button} from "@mui/material";

const SettingsPage = ({UserPhoto, DeleteUser, GetUserPhoto}) => {

    const [value, setValue] = useState({
        image: null,
    });
    const OnInputFileLoad = prop => e => setValue({
        ...value,
        [prop]: e.target.files[0]
    });


    return (
        <div className="SettingsPage">
            <div className="item" style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                alignItems: "center",
                justifyItems: "center",
            }}>
                <img src={UserPhoto ? (`data:image/jpeg;base64,${UserPhoto}`) : (DefaultIcon)} alt={DefaultIcon}
                     style={{
                         objectPosition: "center center",
                         objectFit: "cover",
                         height: 50,
                         width: 50,
                         margin: "0 10px 0 0",
                         borderRadius: "50%"
                     }}/>
                <div>
                    {"@" + JSON.parse(localStorage.getItem("user")).userName}
                </div>
            </div>

            <div>
                {value.image ?
                    <Button className="item" variant="contained"
                            onClick={() => UploadImage(value.image).then(() => GetUserPhoto())}
                            sx={{
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
                                '&:focus': {
                                    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
                                }
                            }}>Upload image</Button>
                    :
                    <Button className="item" variant="contained" component="label">
                        Choose a new picture
                        <input id="inputImage" style={{display: "none"}}
                               type="file"
                               accept="image/png, image/gif, image/jpeg"
                               onChange={OnInputFileLoad("image")}/>
                    </Button>}
            </div>

            <div>
                <Button className="item" variant="contained" onClick={() => DeleteUser()}
                        sx={{
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
                            '&:focus': {
                                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
                            },
                        }}>Log Out</Button>
            </div>
        </div>
    );
};

export default SettingsPage;