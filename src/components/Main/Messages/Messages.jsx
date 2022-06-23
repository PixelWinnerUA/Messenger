import React from 'react';
import "../../../styles/Messages.scss"
import {Button} from "@mui/material";

const Messages = ({sidebarStatus, setSideBarStatus}) => {
    return (
        <div className="Messages Gradient-Background">
            <div className="Messages-Content">
                <p>Your messages</p>
                <Button className="Sidebar-Toggle" variant="contained" onClick={() => {
                    setSideBarStatus(!sidebarStatus)
                    console.log(sidebarStatus)
                }}>Sidebar Toggle</Button>
            </div>
        </div>
    );
};

export default Messages;