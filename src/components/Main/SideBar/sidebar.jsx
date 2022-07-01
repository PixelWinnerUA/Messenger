import React, {useState, useEffect} from 'react';
import "../../../styles/SideBar.scss"
import Chats from "./Chats/chats";
import Users from "./Users/users";
import SettingsBar from "./Settings/settingsBar";
import SettingsPage from "./Settings/settingsPage";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserInfo} from "../../../store/reducers/sidebarReducer";
import {getUserInfo} from "../../../store/reducers/sidebarSelector";

const Sidebar = ({sidebarStatus, setSideBarStatus}) => {

    const [isActive, setActive] = useState(false); //burger menu state
    const [SearchInput, setSearchInput] = useState();

    const dispatch = useDispatch();
    const UserInfo = useSelector(getUserInfo)

    useEffect(() => {
        if (!UserInfo) {
            dispatch(fetchUserInfo())
        }
    }, [UserInfo, dispatch])

    let SideBarContent;

    if (!SearchInput || isActive) {
        SideBarContent = <Chats sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus}/>;
    }
    if (SearchInput) {
        SideBarContent = <Users/>
    }
    if (isActive) {
        SideBarContent = <SettingsPage/>
    }

    return (
        <div className="SideBar">
            <SettingsBar SearchInput={SearchInput} setSearchInput={setSearchInput} isActive={isActive}
                         setActive={setActive}/>
            <div className="Scroll">
                {SideBarContent}
            </div>
        </div>
    );
};

export default Sidebar;