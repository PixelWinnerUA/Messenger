import React from 'react';
import {Button} from "@mui/material";


const Chats = ({sidebarStatus, setSideBarStatus}) => {

    return (
        <div>
            <p>Your chats</p>
            <Button className="Sidebar-Toggle" variant="contained" onClick={() => {
                setSideBarStatus(!sidebarStatus)
                console.log(sidebarStatus)
            }}>Sidebar Toggle</Button>
        </div>
    );
};

export default Chats;