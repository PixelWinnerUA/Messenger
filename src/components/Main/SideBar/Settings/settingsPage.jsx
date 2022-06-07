import React, {useState} from 'react';
import {UploadImage} from "../../../../api/RestApi";
import "../../../../styles/SettingsPage.scss"

const SettingsPage = ({IsAuthenticated}) => {
    const [value, setValue] = useState({
        image: null,
    });
    const OnInputFileLoad = prop => e => setValue({
        ...value,
        [prop]: e.target.files[0]
    });

    return (
        <div className="SettingsPage">
            <div><label htmlFor="inputImage">Load new avatar</label>
                <input id="inputImage" style={{display: "none"}}
                       type="file"
                       accept="image/png, image/gif, image/jpeg"
                       onChange={OnInputFileLoad("image")}/>
            </div>
            <div>
                <button style={{padding: 5}} onClick={() => UploadImage(value.image)}>send img</button>
            </div>
            <div>
                <button style={{padding: 5}} onClick={() => {
                    localStorage.removeItem("user");
                    IsAuthenticated();
                }}> Log Out
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;