import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import "../../styles/Main.scss"
import Messages from "./Messages/messages";
import SideBar from "./SideBar/sidebar";
import * as signalR from "@microsoft/signalr";
import {useDispatch, useSelector} from "react-redux";
import {getAuthStatus, getChatConnection, getSideBarStatus} from "../../store/reducers/appSelector";
import {SetChatsConnectionActionCreator} from "../../store/reducers/appReducer";
import {
    SetChatsListActionCreator,
    SetCurrentChatActionCreator, SetCurrentChatMessagesActionCreator,
    UpdateChatsActionCreator,
    UpdateChatUserImageActionCreator, UpdateCurrentChatMessagesActionCreator
} from "../../store/reducers/chatsReducer";
import {getChatsList, getCurrentChat, getCurrentChatMessages} from "../../store/reducers/chatsSelector";
import {getUserInfo} from "../../store/reducers/sidebarSelector";
import push from "push.js";

const Main = () => {
    const dispatch = useDispatch();
    const SideBarStatus = useSelector(getSideBarStatus);
    const AuthStatus = useSelector(getAuthStatus);
    const ChatsList = useSelector(getChatsList);
    const ChatsConnection = useSelector(getChatConnection);
    const Chat = useSelector(getCurrentChat);
    const UserInfo = useSelector(getUserInfo);
    const CurrentChatMessages = useSelector(getCurrentChatMessages);

    const makePushNotification = useCallback(async (data) => {
        if (ChatsList.length !== 0 && UserInfo?.userName) {
            if (document.hasFocus() === false) {
                if (UserInfo?.userName !== data?.senderUserName) {
                    await push.create(data.otherUserName, {
                        tag: data.lastMessage + data.otherUserName,
                        body: data.lastMessage,
                        icon: data.otherProfileImage?.url,
                        onClick: () => {
                            window.focus();
                            this.close();
                        }
                    })
                }
            } else if (document.hasFocus() && Chat && Chat?.otherUserName !== data.senderUserName) {
                if (UserInfo?.userName !== data.senderUserName) {
                    await push.create(data.otherUserName, {
                        tag: data.lastMessage + data.otherUserName,
                        body: data.lastMessage,
                        icon: data.otherProfileImage?.url,
                        onClick: () => {
                            window.focus();
                            this.close();
                        }
                    })
                }
            }
        }
    }, [Chat, ChatsList, UserInfo])

    // SignalR socket connection
    useLayoutEffect(() => {
        let Connection;
        (async () => {
            if (localStorage.AUTH_TOKEN) {
                Connection = new signalR.HubConnectionBuilder()
                    .withUrl('https://bsite.net/PixelMessenger/hubs/chat', {
                        accessTokenFactory: () => localStorage.AUTH_TOKEN.split(" ")[1]
                    }) // Ensure same as BE
                    .configureLogging(signalR.LogLevel.Information)
                    .withAutomaticReconnect([1000, 3000, 5000, null])
                    .build();

                Connection.on('GetMessages', (data) => {
                    dispatch(SetCurrentChatMessagesActionCreator(data))
                    console.log('GetMessages')
                    console.log(data)
                });
                Connection.on('GetMessage', (data) => {
                    dispatch(UpdateCurrentChatMessagesActionCreator(data))
                    console.log('GetMessage')
                    console.log(data)
                });
                Connection.on('GetChats', (data) => {
                    dispatch(SetChatsListActionCreator(data))
                    console.log('GetChats')
                    console.log(data)
                });

                await Connection.start();
                dispatch(SetChatsConnectionActionCreator(Connection));
            }
        })();
        return () => {
            (async () => {
                await Connection?.stop()
                dispatch(SetCurrentChatActionCreator(null))
            })();
        }
    }, [])
    // SignalR socket connection

    useEffect(() => {
        (async () => {
            ChatsConnection?.on('UpdateChat', (data) => {
                dispatch(UpdateChatsActionCreator(data))
                dispatch(UpdateChatUserImageActionCreator(data))
                makePushNotification(data)
                console.log('UpdateChat')
                console.log(data)
            });
        })();
    }, [makePushNotification])


    return (
        <div className={SideBarStatus ? "Main active" : "Main"}>
            <SideBar UserInfo={UserInfo} ChatsList={ChatsList} AuthStatus={AuthStatus}/>
            <Messages ChatsConnection={ChatsConnection} Chat={Chat} UserInfo={UserInfo}
                      CurrentChatMessages={CurrentChatMessages}/>
        </div>
    );
};

export default React.memo(Main);