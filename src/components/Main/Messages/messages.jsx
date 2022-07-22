import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import "../../../styles/Messages.scss"
import DefaultIcon from "../../../assets/img/Default-Profile-Icon.png";
import {Route, Routes, Navigate} from "react-router-dom";
import MessagesContent from "./messagesContent";
import {SetCurrentChatMessagesActionCreator} from "../../../store/reducers/chatsReducer";
import {useDispatch} from "react-redux";

const Messages = ({Chat, ChatsConnection, CurrentChatMessages, UserInfo}) => {

    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [scrollValues, setScrollValues] = useState({
        scrollTop: false,
        scrollButton: false,
        scrollBottom: false
    });
    const ScrollRef = useRef(null)

    const changeScrollValues = useCallback((prop) => (value) => {
        setScrollValues({...scrollValues, [prop]: value})
    }, [scrollValues])

    const handleSubmit = useCallback(() => {
        if (ChatsConnection && input.trim()) {
            changeScrollValues("scrollButton")(false);
            ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
            ChatsConnection.invoke("SendMessage", {
                text: input,
                RecipientUserName: Chat.otherUserName
            });
        }
        setInput("")
    }, [Chat, ChatsConnection, changeScrollValues, input])

    const handleScroll = useCallback((event) => {
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
    }, [changeScrollValues, scrollValues.scrollBottom, scrollValues.scrollButton, scrollValues.scrollTop])

    useEffect(() => {
        if (localStorage.AUTH_TOKEN && Chat) {
            ChatsConnection.invoke("LoadMessages", Chat.otherUserName)
        }
        return () => {
            dispatch(SetCurrentChatMessagesActionCreator([]))
        }
    }, [Chat])

    let messagesList = useMemo(() => CurrentChatMessages ? (CurrentChatMessages.length !== 0 && CurrentChatMessages.map(item => item.senderUserName === UserInfo.userName ?
        <li className="Messages-Item" style={{alignSelf: "flex-end"}} key={item.text + item.sent}>
            <div className="Messages-Item-Content">
                <img className="Messages-Item-Image"
                     src={UserInfo.profileImage ? (UserInfo.profileImage.url) : (DefaultIcon)}
                     alt={DefaultIcon}/>
                <div className="Messages-Item-Content-Wrapper"
                     style={{backgroundColor: "#12569a", color: "white"}}>
                    <span className="Messages-Item-Text">{item.text}</span>
                    <span className="Messages-Item-Date"
                          style={{color: "#a9a9a9"}}>{(new Date(item.sent)).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
        </li>
        :
        <li className="Messages-Item" style={{alignSelf: "flex-start"}} key={item.text + item.sent}>
            <div className="Messages-Item-Content">
                <img className="Messages-Item-Image"
                     src={Chat?.otherProfileImage ? (Chat.otherProfileImage?.url) : (DefaultIcon)}
                     alt={DefaultIcon}/>
                <div className="Messages-Item-Content-Wrapper">
                    <span className="Messages-Item-Text">{item.text}</span>
                    <span className="Messages-Item-Date">{(new Date(item.sent)).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
        </li>)) : null, [Chat, CurrentChatMessages, UserInfo]);

    return (
        <div className="Messages" style={UserInfo?.backgroundImage && {
            background: `url(${UserInfo.backgroundImage.url}) no-repeat center center / cover`,
        }}>
            <Routes>
                <Route path={"/chat"}
                       element={Chat ?
                           <MessagesContent scrollValues={scrollValues} changeScrollValues={changeScrollValues}
                                            Chat={Chat} input={input} setInput={setInput} ScrollRef={ScrollRef}
                                            UserInfo={UserInfo} messagesList={messagesList}
                                            handleScroll={handleScroll} handleSubmit={handleSubmit}
                                            CurrentChatMessages={CurrentChatMessages}/> :
                           <Navigate to="/"/>}/>
            </Routes>
        </div>);
};

export default React.memo(Messages);