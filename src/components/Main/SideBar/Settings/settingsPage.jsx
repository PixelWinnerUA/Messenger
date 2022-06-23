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
                <div className="UserInfo">
                    <img src={UserInfo.photo ? (`data:image/jpeg;base64,${UserInfo.photo.bytes}`) : (DefaultIcon)}
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

            <div>
                {image ?
                    <div>
                        <div className="Preview-Changes">
                            <p>Profile changes preview:</p>
                            {UserInfo ?
                                <div className="Preview-Changes-UserInfo">
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
                                <div className="UserInfo-Preloader">
                                    <CircularProgress/>
                                </div>}
                        </div>
                        <div className="Uploading-Tools">
                            <div className="item">
                                <Button variant="contained"
                                        onClick={() => UploadImage(image).then(() => {
                                            GetUserInfo()
                                            setImage(null)
                                        })}>
                                    Upload picture</Button>
                            </div>
                            <div className="item">
                                <Button className="Cancel-Button" variant="contained"
                                        onClick={() => setImage(null)}>
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