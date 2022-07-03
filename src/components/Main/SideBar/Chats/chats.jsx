import React from 'react';
import {Button} from "@mui/material";
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png";
import "../../../../styles/Chats.scss"

const Chats = ({sidebarStatus, setSideBarStatus, chats}) => {
    let chatList = chats.length !== 0 && chats.map(item => <li>
        <div className="Chat-Item">
            <img src={item.otherProfileImage ? (item.otherProfileImage.url) : (DefaultIcon)}
                 alt={DefaultIcon} loading="lazy"/>
            <div className="Chat-Info">
                <div className="Chat-UserName">
                    <p>{item.otherName}</p>
                    <p className="Chat-Date">{item.messageStamp.split("T")[1].split(".")[0].substring(0,5)}</p>
                </div>
                <div className="Chat-LastMessage">
                    <p>{item.lastMessage}</p>
                </div>
            </div>
        </div>
    </li>)


    return (
        <div>
            <div className="Sidebar-Toggle">
                <Button variant="contained" onClick={() => {
                    setSideBarStatus(!sidebarStatus)
                    console.log(sidebarStatus)
                }}>Sidebar Toggle</Button>
            </div>

            {chatList ? <ul>{chatList}</ul> : <p style={{margin: 10}}>It's too empty...</p>}

        </div>
    );
};

export default Chats;