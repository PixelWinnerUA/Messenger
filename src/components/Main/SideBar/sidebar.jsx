import React, {useState, useEffect} from 'react';
import "../../../styles/SideBar.scss"
import Chats from "./Chats/chats";
import Users from "./Users/users";
import SettingsBar from "./Settings/settingsBar";
import SettingsPage from "./Settings/settingsPage";
import {useDispatch, useSelector} from "react-redux";
import { SetUserInfoActionCreator} from "../../../store/reducers/sidebarReducer";
import * as signalR from "@microsoft/signalr";
import {getAuthStatus} from "../../../store/reducers/appSelector";
import {useMutation, useQuery} from "react-query";
import {FetchCurrentUser, SearchUsers} from "../../../api/RestApi";

const Sidebar = ({sidebarStatus, setSideBarStatus}) => {
    //SignalR socket connection
    const [connection, setConnection] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        (async () => {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl('/hubs/chat', {
                    accessTokenFactory: () => localStorage.AUTH_TOKEN.split(" ")[1]
                }) // Ensure same as BE
                .withAutomaticReconnect()
                .build();

            await newConnection.start();
            newConnection.on('GetChats', (data) => {
                console.log(data)
                setChats(data)
            });
            setConnection(newConnection);
        })();
    }, [])
    //SignalR socket connection

    const [isActive, setActive] = useState(false); //Burger menu state
    const [SearchInput, setSearchInput] = useState(""); //Search bar state

    const dispatch = useDispatch();
    const AuthStatus = useSelector(getAuthStatus)

    const {mutate: fetchSearch, isLoading, data: usersList} = useMutation(({input}) => SearchUsers(input));
    const {data: fetchedUserInfo, refetch: refetchUserInfo} =
        useQuery("FetchCurrentUser", FetchCurrentUser, {enabled: false})

    //Fetch onMount profileData
    useEffect(() => {
        if (AuthStatus) {
            fetchedUserInfo ? dispatch(SetUserInfoActionCreator(fetchedUserInfo)) : refetchUserInfo()
        }
    }, [AuthStatus, dispatch, fetchedUserInfo, refetchUserInfo])

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
};

export default Sidebar;