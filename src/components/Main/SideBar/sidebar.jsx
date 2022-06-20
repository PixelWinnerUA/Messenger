import React, {useState, useEffect} from 'react';
import Settingsbar from "./Settings/settingsbar";
import "../../../styles/SideBar.scss"
import Chats from "./Chats/Chats";
import SettingsPageContainer from "./Settings/settingsPageContainer";
import UsersContainer from "./Users/usersContainer";


const Sidebar = ({SearchUsers, GetUserInfo, SetSearchInput, SearchInput}) => {
    const [isActive, setActive] = useState("false"); //burger menu state

    useEffect(() => {
        GetUserInfo()
    }, [GetUserInfo])

    let SideBarContent;

    if (!SearchInput || isActive) {
        SideBarContent = <Chats/>;
    }
    if (SearchInput) {
        SideBarContent = <UsersContainer/>
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