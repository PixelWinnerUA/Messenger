import React, {useState, useEffect} from 'react';
import "../../../styles/SideBar.scss"
import Chats from "./Chats/chats";
import Users from "./Users/users";
import SettingsBar from "./Settings/settingsBar";
import SettingsPage from "./Settings/settingsPage";
import {useDispatch, useSelector} from "react-redux";
import {SetUserInfoActionCreator} from "../../../store/reducers/sidebarReducer";
import {getAuthStatus} from "../../../store/reducers/appSelector";
import {useMutation, useQuery} from "react-query";
import {FetchCurrentUser, SearchUsers} from "../../../api/RestApi";
import {getUserInfo} from "../../../store/reducers/sidebarSelector";

const Sidebar = ({sidebarStatus, setSideBarStatus, chats}) => {

        const [isActive, setActive] = useState(false); //Burger menu state
        const [SearchInput, setSearchInput] = useState(""); //Search bar state

        const dispatch = useDispatch();
        const AuthStatus = useSelector(getAuthStatus)
        const UserInfo = useSelector(getUserInfo)

        const {mutate: fetchSearch, isLoading, data: usersList} = useMutation(({input}) => SearchUsers(input));
        const {data: fetchedUserInfo, refetch: refetchUserInfo} =
            useQuery("FetchCurrentUser", FetchCurrentUser, {enabled: false})

        //Fetch onMount profileData
        useEffect(() => {
            if (AuthStatus) {
                //loaded userinfo !== current userInfo in global state
                fetchedUserInfo !== UserInfo ? dispatch(SetUserInfoActionCreator(fetchedUserInfo)) : refetchUserInfo();
            }
        }, [AuthStatus, UserInfo, dispatch, fetchedUserInfo, refetchUserInfo])

        let SideBarContent;

        if (!SearchInput || isActive) {
            SideBarContent = <Chats chats={chats} sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus}/>;
        }
        if (SearchInput) {
            SideBarContent = <Users isLoading={isLoading} usersList={usersList}/>
        }
        if (isActive) {
            SideBarContent = <SettingsPage refetchUserInfo={refetchUserInfo}/>
        }

        return (
            <div className="SideBar">
                <SettingsBar fetchSearch={fetchSearch} SearchInput={SearchInput} setSearchInput={setSearchInput}
                             isActive={isActive} setActive={setActive}/>
                <div className="Scroll">
                    {SideBarContent}
                </div>
            </div>
        );
    }
;

export default Sidebar;