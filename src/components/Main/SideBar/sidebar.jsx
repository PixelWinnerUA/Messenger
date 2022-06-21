import React, {useState, useEffect} from 'react';
import "../../../styles/SideBar.scss"
import Chats from "./Chats/Chats";
import Users from "./Users/Users";
import Settingsbar from "./Settings/settingsbar";
import SettingsPageContainer from "./Settings/settingsPageContainer";


const Sidebar = ({GetUserInfo, UsersList, SearchStatus, SearchUsers}) => {
    const [isActive, setActive] = useState(false); //burger menu state
    const [SearchInput, setSearchInput] = useState();

    useEffect(() => {
        GetUserInfo()
    }, [GetUserInfo])

    let SideBarContent;

    if (!SearchInput || isActive) {
        SideBarContent = <Chats/>;
    }
    if (SearchInput) {
        SideBarContent = <Users UsersList={UsersList} SearchStatus={SearchStatus}/>
    }
    if (isActive) {
        SideBarContent = <SettingsPageContainer/>
    }

    return (
        <div className="SideBar">
            <Settingsbar SearchUsers={SearchUsers} SearchInput={SearchInput} setSearchInput={setSearchInput}
                         isActive={isActive} setActive={setActive}/>
            <div className="Scroll">
                {SideBarContent}
            </div>
        </div>
    );
};

export default Sidebar;