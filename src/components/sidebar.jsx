import React from 'react';
import Settingsbar from "./settingsbar";
import Chats from "./chats";
import "../styles/SideBar.scss"

const Sidebar = () => {
    return (
        <div className="SideBar">
            <Settingsbar></Settingsbar>
            <Chats></Chats>
        </div>
    );
};

export default Sidebar;