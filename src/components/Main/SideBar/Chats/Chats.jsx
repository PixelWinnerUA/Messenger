import React from 'react';
import {Button} from "@mui/material";


const Chats = ({sidebarStatus, setSideBarStatus}) => {

    return (
        <div>
            <p>Your chats</p>
            <div className="Sidebar-Toggle">
                <Button variant="contained" onClick={() => {
                    setSideBarStatus(!sidebarStatus)
                    console.log(sidebarStatus)
                }}>Sidebar Toggle</Button>
            </div>
        </div>
    );
};

export default Chats;