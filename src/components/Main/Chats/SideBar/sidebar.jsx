import React from 'react';
import Settingsbar from "./SettingsBar/settingsbar";
import "../../../../styles/SideBar.scss"
import Chatscontainer from "./Chats/chatscontainer";

const Sidebar = () => {
    return (
        <div className="SideBar">
            <Settingsbar></Settingsbar>
            <Chatscontainer/>
        </div>
    );
};

export default Sidebar;