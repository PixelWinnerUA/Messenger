import React from 'react';
import "../../../styles/Messages.scss"
import {Button} from "@mui/material";
import "../../../styles/GradientBackground.scss"

const Messages = ({sidebarStatus, setSideBarStatus}) => {
    return (
        <div className="Messages Gradient-Background">
            <div className="Messages-Content">
                <p>Your messages</p>
                <div className="Sidebar-Toggle">
                    <Button variant="contained" onClick={() => {
                        setSideBarStatus(!sidebarStatus)
                        console.log(sidebarStatus)
                    }}>Sidebar Toggle</Button>
                </div>
            </div>
        </div>
    );
};

export default Messages;