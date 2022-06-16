import React, {useState} from 'react';
import {UploadImage} from "../../../../api/RestApi";
import "../../../../styles/SettingsPage.scss"
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png";
import {Button} from "@mui/material";

const SettingsPage = ({UserInfo, DeleteUser, GetUserInfo}) => {

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
                <img src={UserInfo.photo.bytes ? (`data:image/jpeg;base64,${UserInfo.photo.bytes}`) : (DefaultIcon)}
                     alt={DefaultIcon}
                     style={{
                         objectPosition: "center center",
                         objectFit: "cover",
                         height: 50,
                         width: 50,
                         margin: "0 10px 0 0",
                         borderRadius: "50%"
                     }}/>
                <div style={{display: "grid", gridTemplateRows: "1fr 1fr"}}>
                    <div>{UserInfo.name}</div>
                    <div style={{color: "gray"}}>{"@" + UserInfo.userName}</div>
                </div>
            </div>

            <div>
                {value.image ?
                    <div>
                        <div className="item" style={{display: "grid", gridTemplateRows: "auto 1fr"}}>
                            Picture preview:
                            <img src={URL.createObjectURL(value.image)} style={{
                                maxWidth: "100%",
                                margin: "10px 0 0 0"
                            }} alt="Picture preview"/>
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Button className="item" variant="contained"
                                    onClick={() => UploadImage(value.image).then(() => {
                                        GetUserInfo()
                                        setValue({
                                            ...value,
                                            image: null
                                        })
                                    })}>
                                Upload picture</Button>
                            <Button className="item" variant="contained"
                                    onClick={() => setValue({
                                        ...value,
                                        image: null
                                    })}
                                    sx={{
                                        backgroundColor: "#bd0000",
                                        color: "#fff",
                                        '&:hover': {
                                            backgroundColor: "#a20000",
                                        },
                                        '&:active': {
                                            backgroundColor: "#a20000",
                                        },
                                    }}>
                                Cancel</Button>
                        </div>
                    </div>
                    :
                    <Button className="item" variant="contained" component="label">
                        Choose a new picture
                        <input id="inputImage" style={{display: "none"}}
                               type="file"
                               accept="image/png, image/gif, image/jpeg"
                               onChange={OnInputFileLoad("image")}/>
                    </Button>
                }
            </div>

            <div>
                <Button className="item" variant="contained" onClick={() => DeleteUser()}>Log Out</Button>
            </div>
        </div>
    );
};

export default SettingsPage;