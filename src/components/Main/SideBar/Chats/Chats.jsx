import React from 'react';
import {Button} from "@mui/material";


const Chats = ({sidebarStatus, setSideBarStatus}) => {

    return (
        <div>
            <p>Your chats</p>
            <Button variant="contained" onClick={() => {
                setSideBarStatus(!sidebarStatus)
                console.log(sidebarStatus)
            }}>Sidebar Toggle</Button>
        </div>
    );
};

export default Chats;