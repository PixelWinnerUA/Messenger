import React, {useState, useEffect} from 'react';
import Settingsbar from "./Settings/settingsbar";
import "../../../styles/SideBar.scss"
import Users from "./Users/Users";
import Chats from "./Chats/Chats";

import SettingsPageContainer from "./Settings/settingsPageContainer";


const Sidebar = ({SearchUsers, GetUserInfo, UsersList, SetSearchInput, SearchInput}) => {
    const [isActive, setActive] = useState("false"); //burger menu state

    useEffect(() => {
        GetUserInfo()
    }, [GetUserInfo])

    let SideBarContent;

    if (!SearchInput || isActive) {
        SideBarContent = <Chats/>;
    }
    if (SearchInput) {
        SideBarContent = <Users UsersList={UsersList}/>
    }
    if (!isActive) {
        SideBarContent = <SettingsPageContainer/>
    }

    return (
        <div className="SideBar">
            <Settingsbar SearchUsers={SearchUsers} SetSearchInput={SetSearchInput}
                         isActive={isActive}
                         setActive={setActive}
            />
            <div className="Scroll">
                {SideBarContent}
            </div>
        </div>
    );
};

export default Sidebar;