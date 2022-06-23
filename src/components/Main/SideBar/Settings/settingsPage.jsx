import React, {useState} from 'react';
import {UploadImage} from "../../../../api/RestApi";
import "../../../../styles/SettingsPage.scss"
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png";
import {Button, CircularProgress} from "@mui/material";

const SettingsPage = ({UserInfo, DeleteUser, GetUserInfo}) => {
    const [image, setImage] = useState(null);

    return (
        <div className="SettingsPage">

            {UserInfo ?
                <div className="item" style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    alignItems: "center",
                    justifyItems: "start",
                }}>
                    <img src={UserInfo.photo ? (`data:image/jpeg;base64,${UserInfo.photo.bytes}`) : (DefaultIcon)}
                         alt={DefaultIcon} style={{
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
                :
                <div className="item" style={{width: "100%", display: "flex", justifyContent: "center"}}>
                    <CircularProgress/>
                </div>}

            <div>
                {image ?
                    <div>
                        <div className="item" style={{display: "grid", gridTemplateRows: "auto 1fr"}}>
                            Profile changes preview:
                            {UserInfo ?
                                <div style={{
                                    background: "#12569a",
                                    borderRadius: 10,
                                    padding: 10,
                                    margin: " 10px 0 0 0",
                                    display: "grid",
                                    gridTemplateColumns: "auto 1fr",
                                    alignItems: "center",
                                    justifyItems: "start",
                                }}>
                                    <img src={URL.createObjectURL(image)} style={{
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
                                <div className="item"
                                     style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                    <CircularProgress/>
                                </div>}
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div className="item">
                                <Button variant="contained"
                                        onClick={() => UploadImage(image).then(() => {
                                            GetUserInfo()
                                            setImage(null)
                                        })}>
                                    Upload picture</Button>
                            </div>
                            <div className="item">
                                <Button variant="contained"
                                        onClick={() => setImage(null)}
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
                                   onChange={e => setImage(e.target.files[0])}/>
                        </Button>
                    </div>
                }
            </div>

            <div>
                <Button className="item" variant="contained" onClick={() => DeleteUser()}>Log Out</Button>
            </div>
        </div>
    );
};

export default SettingsPage;