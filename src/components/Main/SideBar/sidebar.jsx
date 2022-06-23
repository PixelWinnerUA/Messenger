import React, {useState, useEffect} from 'react';
import "../../../styles/SideBar.scss"
import Chats from "./Chats/Chats";
import Users from "./Users/Users";
import Settingsbar from "./Settings/settingsbar";
import SettingsPage from "./Settings/settingsPage";


const Sidebar = ({GetUserInfo, UserInfo, DeleteUser, SearchUsers, UsersList, SearchStatus, sidebarStatus, setSideBarStatus}) => {
    const [isActive, setActive] = useState(false); //burger menu state
    const [SearchInput, setSearchInput] = useState();

    useEffect(() => {
        GetUserInfo()
    }, [GetUserInfo])

    let SideBarContent;

    if (!SearchInput || isActive) {
        SideBarContent = <Chats sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus}/>;
    }
    if (SearchInput) {
        SideBarContent = <Users UsersList={UsersList} SearchStatus={SearchStatus}/>
    }
    if (isActive) {
        SideBarContent = <SettingsPage GetUserInfo={GetUserInfo} UserInfo={UserInfo} DeleteUser={DeleteUser}/>
    }

    return (
        <div className={sidebarStatus ? "SideBar close" : "SideBar"}>
            <Settingsbar SearchUsers={SearchUsers} SearchInput={SearchInput} setSearchInput={setSearchInput}
                         isActive={isActive} setActive={setActive}/>
            <div className="Scroll">
                {SideBarContent}
            </div>
        </div>
    );
};

export default Sidebar;