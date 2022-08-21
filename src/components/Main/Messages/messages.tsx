import React, {useState, useEffect, useRef, useMemo, UIEvent} from 'react';
import "../../../styles/Messages.scss"
// @ts-ignore
import DefaultIcon from "../../../assets/img/Default-Profile-Icon.png";
import {Route, Routes, Navigate} from "react-router-dom";
import MessagesContent from "./messagesContent";
import {ChatsActionsCreators} from "../../../store/reducers/chatsReducer";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {CurrentChat, Message} from "../../../types/chatsReducerTypes";
import {ChatConnection} from "../../../types/appReducerTypes";
import {UserType} from "../../../types/sidebarReducerTypes";

interface MessagesPropsType {
    CurrentChat: undefined | CurrentChat,
    ChatsConnection: ChatConnection,
    CurrentChatMessages: Message[],
    UserInfo: undefined | UserType
}

export interface scrollValues {
    scrollTop: boolean,
    scrollButton: boolean,
    scrollBottom: boolean
}

const Messages = ({CurrentChat, ChatsConnection, CurrentChatMessages, UserInfo}: MessagesPropsType) => {

    const dispatch = useTypedDispatch();
    const [input, setInput] = useState<string>("");
    const [scrollValues, setScrollValues] = useState<scrollValues>({
        scrollTop: false,
        scrollButton: false,
        scrollBottom: false
    });
    const ScrollRef = useRef<HTMLDivElement>(null)

    const changeScrollValues = (prop: keyof scrollValues) => (value: boolean) => {
        setScrollValues({...scrollValues, [prop]: value})
    }

    const handleSubmit = () => {
        if (ChatsConnection && input.trim()) {
            changeScrollValues("scrollButton")(false);
            if (ScrollRef.current) {
                ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
            }
            ChatsConnection?.invoke("SendMessage", {
                text: input,
                RecipientUserName: CurrentChat?.otherUserName
            });
        }
        setInput("")
    }

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        // console.log(event.currentTarget.scrollTop + " " + event.currentTarget.scrollHeight + " " + event.currentTarget.clientHeight)
        if (scrollValues.scrollTop !== (event.currentTarget.scrollTop === 0)) {
            changeScrollValues("scrollTop")(event.currentTarget.scrollTop === 0);
        }
        if (scrollValues.scrollButton !== (event.currentTarget.scrollHeight - event.currentTarget.scrollTop >= event.currentTarget.clientHeight * 2)) {
            changeScrollValues("scrollButton")(event.currentTarget.scrollHeight - event.currentTarget.scrollTop >= event.currentTarget.clientHeight * 2);
        }
        if (scrollValues.scrollBottom !== (event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight)) {
            changeScrollValues("scrollBottom")(event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight);
        }
    }

    useEffect(() => {
        if (localStorage.AUTH_TOKEN && CurrentChat) {
            ChatsConnection?.invoke("LoadMessages", CurrentChat.otherUserName)
        }
        return () => {
            dispatch(ChatsActionsCreators.SetCurrentChatMessagesActionCreator([]))
        }
    }, [CurrentChat])

    let messagesList = useMemo(() => (CurrentChatMessages.length !== 0 ? CurrentChatMessages.map(item => item.senderUserName === UserInfo?.userName ? //CurrentChatMessages ? : null
        <li className="Messages-Item" style={{alignSelf: "flex-end"}} key={item.text + item.sent}>
            <div className="Messages-Item-Content">
                <img className="Messages-Item-Image"
                     src={UserInfo?.profileImage ? (UserInfo.profileImage.url) : (DefaultIcon)}
                     alt={DefaultIcon}/>
                <div className="Messages-Item-Content-Wrapper"
                     style={{backgroundColor: "#12569a", color: "white"}}>
                    <span className="Messages-Item-Text">{item.text}</span>
                    <span className="Messages-Item-Date"
                          style={{color: "#a9a9a9"}}>{(new Date(item.sent)).toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span>
                </div>
            </div>
        </li>
        :
        <li className="Messages-Item" style={{alignSelf: "flex-start"}} key={item.text + item.sent}>
            <div className="Messages-Item-Content">
                <img className="Messages-Item-Image"
                     src={CurrentChat?.otherProfileImage ? (CurrentChat.otherProfileImage?.url) : (DefaultIcon)}
                     alt={DefaultIcon}/>
                <div className="Messages-Item-Content-Wrapper">
                    <span className="Messages-Item-Text">{item.text}</span>
                    <span className="Messages-Item-Date">{(new Date(item.sent)).toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span>
                </div>
            </div>
        </li>) : undefined), [CurrentChat, CurrentChatMessages, UserInfo]);

    return (
        <div className="Messages" style={UserInfo?.backgroundImage ? {
            background: `url(${UserInfo.backgroundImage.url}) no-repeat center center / cover`,
        } : undefined}>
            <Routes>
                <Route path={"/chat"} children
                       element={CurrentChat ?
                           <MessagesContent scrollValues={scrollValues} changeScrollValues={changeScrollValues}
                                            CurrentChat={CurrentChat} input={input} setInput={setInput}
                                            ScrollRef={ScrollRef}
                                            UserInfo={UserInfo} messagesList={messagesList}
                                            handleScroll={handleScroll} handleSubmit={handleSubmit}
                                            CurrentChatMessages={CurrentChatMessages}/> :
                           <Navigate to="/"/>}/>
            </Routes>
        </div>);
};

export default React.memo(Messages);