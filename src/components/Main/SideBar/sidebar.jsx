import React, {useState, useEffect} from 'react';
import Settingsbar from "./Settings/settingsbar";
import "../../../styles/SideBar.scss"
import Users from "./Users/Users";
import Chats from "./Chats/Chats";
import SettingsPage from "./Settings/settingsPage";

const Sidebar = ({SearchUsers, GetUserInfo, UserInfo, UsersList, DeleteUser}) => {
    const [SearchInput, setSearchInput] = useState();
    const [isActive, setActive] = useState("false"); //burger menu state
    useEffect(() => {
        GetUserInfo()
    }, [])
    let SideBarContent;

    if (!SearchInput || isActive) {
        SideBarContent = <Chats/>;
    }
    if (SearchInput) {
        SideBarContent = <Users UsersList={UsersList}/>
    }
    if (!isActive) {
        SideBarContent =
            <SettingsPage UserInfo={UserInfo} GetUserInfo={GetUserInfo} DeleteUser={DeleteUser}/>
    }

    return (
        <div className="SideBar">
            <Settingsbar SearchUsers={SearchUsers} setSearchInput={setSearchInput}
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