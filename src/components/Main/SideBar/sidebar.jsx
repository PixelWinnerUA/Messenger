import React, {useState, useEffect} from 'react';
import "../../../styles/SideBar.scss"
import Chats from "./Chats/chats";
import Users from "./Users/users";
import SettingsBar from "./Settings/settingsBar";
import SettingsPage from "./Settings/settingsPage";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserInfo} from "../../../store/reducers/sidebarReducer";
import {getUserInfo} from "../../../store/reducers/sidebarSelector";
import * as signalR from "@microsoft/signalr";
import {getAuthStatus} from "../../../store/reducers/appSelector";
import {useMutation} from "react-query";
import {SearchUsers} from "../../../api/RestApi";

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
    const UserInfo = useSelector(getUserInfo) //Profile info of current user
    const AuthStatus = useSelector(getAuthStatus)


    const {mutate: fetchSearch, isLoading, data} = useMutation(({input}) => SearchUsers(input));

    //useEffect for search users
    useEffect(() => {
        if (SearchInput) {
            fetchSearch({input:SearchInput})
        }
    }, [SearchInput, fetchSearch])

    //Fetch onMount profileData
    useEffect(() => { //On load fetch profile info
        if (!UserInfo && AuthStatus) {
            dispatch(fetchUserInfo()) //Переделать на query
        }
    }, [UserInfo, AuthStatus, dispatch])

    let SideBarContent;

    if (!SearchInput || isActive) {
        SideBarContent = <Chats chats={chats} sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus}/>;
    }
    if (SearchInput) {
        SideBarContent = <Users isLoading={isLoading} data={data}/>
    }
    if (isActive) {
        SideBarContent = <SettingsPage/>
    }

    return (
        <div className="SideBar">
            <SettingsBar setSearchInput={setSearchInput} isActive={isActive} setActive={setActive}/>
            <div className="Scroll">
                {SideBarContent}
            </div>
        </div>
    );
};

export default Sidebar;