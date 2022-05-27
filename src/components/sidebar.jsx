import React from 'react';
import Settingsbar from "./settingsbar";
import "../styles/SideBar.scss"
import Chatscontainer from "./chatscontainer";

const Sidebar = () => {
    return (
        <div className="SideBar">
            <Settingsbar></Settingsbar>
            <Chatscontainer/>
        </div>
    );
};

export default Sidebar;