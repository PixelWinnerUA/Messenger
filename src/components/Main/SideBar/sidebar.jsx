import React, {useState} from 'react';
import Settingsbar from "./Settings/settingsbar";
import "../../../styles/SideBar.scss"
import Users from "./Users/Users";
import Chats from "./Chats/Chats";
import SettingsPage from "./Settings/settingsPage";


const Sidebar = ({SearchUsers, GetAuthStatus, UsersList}) => {
    const [SearchInput, setSearchInput] = useState();
    const [isActive, setActive] = useState("false"); //burger menu state


    let SideBarContent;

    if (!SearchInput || isActive) {
        SideBarContent = <Chats/>;
    }
    if (SearchInput) {
        SideBarContent = <Users UsersList={UsersList}/>
    }
    if (!isActive) {
        SideBarContent = <SettingsPage IsAuthenticated={GetAuthStatus}/>
    }

    return (
        <div className="SideBar">
            <Settingsbar SearchUsers={SearchUsers} setSearchInput={setSearchInput}
                         isActive={isActive}
                         setActive={setActive}
                         IsAuthenticated={GetAuthStatus}/>
            <div className="Scroll">
                {SideBarContent}
            </div>
        </div>
    );
};

export default Sidebar;