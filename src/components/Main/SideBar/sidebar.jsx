import React, {useState, useEffect} from 'react';
import Settingsbar from "./Settings/settingsbar";
import "../../../styles/SideBar.scss"
import Users from "./Users/Users";
import Chats from "./Chats/Chats";
import SettingsPage from "./Settings/settingsPage";


const Sidebar = ({SearchUsers, GetUserPhoto, UserPhoto, UsersList, DeleteUser}) => {
    const [SearchInput, setSearchInput] = useState();
    const [isActive, setActive] = useState("false"); //burger menu state

    useEffect(() => {
        GetUserPhoto();
    }, []) //подумай стоит ли загружать постоянно фото при открытии меню [isActive]

    let SideBarContent;

    if (!SearchInput || isActive) {
        SideBarContent = <Chats/>;
    }
    if (SearchInput) {
        SideBarContent = <Users UsersList={UsersList}/>
    }
    if (!isActive) {
        SideBarContent =
            <SettingsPage UserPhoto={UserPhoto} GetUserPhoto={GetUserPhoto} DeleteUser={DeleteUser}/>
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