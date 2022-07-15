import React, {useState, useEffect} from 'react';
import "../../../styles/SideBar.scss"
import Chats from "./Chats/chats";
import Users from "./Users/users";
import SettingsBar from "./Settings/settingsBar";
import SettingsPage from "./Settings/settingsPage";
import {useDispatch} from "react-redux";
import {SetUserInfoActionCreator} from "../../../store/reducers/sidebarReducer";
import {useMutation, useQuery} from "react-query";
import {FetchCurrentUser, SearchUsers} from "../../../api/RestApi";


const Sidebar = ({UserInfo, AuthStatus, ChatsList}) => {
    const [isActive, setActive] = useState(false); //Burger menu state
    const [SearchInput, setSearchInput] = useState(""); //Search bar state
    const dispatch = useDispatch();

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
        SideBarContent = <Chats ChatsList={ChatsList} UserInfo={UserInfo}/>;
    }
    if (SearchInput) {
        SideBarContent = <Users isLoading={isLoading} usersList={usersList} UserInfo={UserInfo}/>
    }
    if (isActive) {
        SideBarContent = <SettingsPage refetchUserInfo={refetchUserInfo} UserInfo={UserInfo}/>
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
};

export default React.memo(Sidebar);