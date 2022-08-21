import React, {useLayoutEffect} from 'react';
import "../../styles/Main.scss"
import Messages from "./Messages/messages";
import SideBar from "./SideBar/sidebar";
import * as signalR from "@microsoft/signalr";
import {getAuthStatus, getChatConnection} from "../../store/reducers/appSelector";
import {AppActionsCreators} from "../../store/reducers/appReducer";
import {ChatsActionsCreators} from "../../store/reducers/chatsReducer";
import {getChatsList, getCurrentChat, getCurrentChatMessages} from "../../store/reducers/chatsSelector";
import {getSideBarStatus, getUserInfo} from "../../store/reducers/sidebarSelector";
import {makePushNotification} from "../../api/RestApi";
import {useTypedDispatch} from "../../hooks/useTypedDispatch";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {HubConnection} from "@microsoft/signalr";
import {Chat, Message} from "../../types/chatsReducerTypes";

const Main = () => {
    const dispatch = useTypedDispatch();
    const SideBarStatus = useTypedSelector(getSideBarStatus);
    const AuthStatus = useTypedSelector(getAuthStatus);
    const ChatsList = useTypedSelector(getChatsList);
    const ChatsConnection = useTypedSelector(getChatConnection);
    const CurrentChat = useTypedSelector(getCurrentChat);
    const UserInfo = useTypedSelector(getUserInfo);
    const CurrentChatMessages = useTypedSelector(getCurrentChatMessages);

    // SignalR socket connection
    useLayoutEffect(() => {
        let Connection: HubConnection;
        (async () => {
            if (localStorage.AUTH_TOKEN) {
                Connection = new signalR.HubConnectionBuilder()
                    .withUrl('https://bsite.net/PixelMessenger/hubs/chat', {
                        accessTokenFactory: () => localStorage.AUTH_TOKEN.split(" ")[1]
                    }) // Ensure same as BE
                    .configureLogging(signalR.LogLevel.Information)
                    .withAutomaticReconnect([1000, 3000, 5000])
                    .build();

                Connection.on('GetMessages', (data: Message[]) => {
                    dispatch(ChatsActionsCreators.SetCurrentChatMessagesActionCreator(data))
                    console.log('GetMessages')
                    console.log(data)
                });
                Connection.on('GetMessage', (data: Message) => {
                    dispatch(ChatsActionsCreators.UpdateCurrentChatMessagesActionCreator(data))
                    console.log('GetMessage')
                    console.log(data)
                });
                Connection.on('GetChats', (data: Chat[]) => {
                    dispatch(ChatsActionsCreators.SetChatsListActionCreator(data))
                    console.log('GetChats')
                    console.log(data)
                });
                Connection.on('UpdateChat', (data: Chat) => {
                    dispatch(ChatsActionsCreators.UpdateChatsActionCreator(data))
                    dispatch(ChatsActionsCreators.UpdateChatUserImageActionCreator(data))
                    makePushNotification(data)
                    console.log('UpdateChat')
                    console.log(data)
                });

                await Connection.start();
                dispatch(AppActionsCreators.SetChatsConnectionActionCreator(Connection));
            }
        })();
        return () => {
            (async () => {
                await Connection?.stop()
                dispatch(ChatsActionsCreators.SetCurrentChatActionCreator(undefined))
            })();
        }
    }, [dispatch])
    // SignalR socket connection


    return (
        <div className={SideBarStatus ? "Main active" : "Main"}>
            <SideBar UserInfo={UserInfo} ChatsList={ChatsList} AuthStatus={AuthStatus}/>
            <Messages ChatsConnection={ChatsConnection} CurrentChat={CurrentChat} UserInfo={UserInfo}
                      CurrentChatMessages={CurrentChatMessages}/>
        </div>
    );
};

export default Main;