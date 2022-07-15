import React, {useState, useEffect, useRef, useMemo} from 'react';
import "../../../styles/Messages.scss"
import "../../../styles/Space-Background.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DefaultIcon from "../../../assets/img/Default-Profile-Icon.png";
import {useDispatch, useSelector} from "react-redux";
import {getSideBarStatus} from "../../../store/reducers/appSelector";
import {SetSideBarStatusActionCreator} from "../../../store/reducers/appReducer";
import {TextareaAutosize} from "@mui/material";
import {SetCurrentChatMessagesActionCreator} from "../../../store/reducers/chatsReducer";

const Messages = ({Chat, ChatsConnection, CurrentChatMessages, UserInfo}) => {
    const dispatch = useDispatch();
    const SideBarStatus = useSelector(getSideBarStatus);

    const [input, setInput] = useState("");
    const [scrollValues, setScrollValues] = useState({
        scrollTop: false,
        scrollButton: false,
        scrollBottom: false
    });

    const FirstMessage = useRef(null);
    const FirstScroll = useRef(false);
    const ScrollRef = useRef(null)

    const handleSubmit = () => {
        if (ChatsConnection && input.trim()) {
            changeScrollValues("scrollButton")(false);
            ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
            ChatsConnection.invoke("SendMessage", {
                text: input,
                RecipientUserName: Chat.otherUserName
            });
        }
        setInput("")
    }
    const handleScroll = (event) => {
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
    const changeScrollValues = (prop) => (value) => {
        setScrollValues({...scrollValues, [prop]: value})
    }

    useEffect(() => {
        return () => {
            dispatch(SetSideBarStatusActionCreator(false))
        }
    }, [])

    useEffect(() => {
        if (localStorage.AUTH_TOKEN && Chat) {
            ChatsConnection.invoke("LoadMessages", Chat.otherUserName)
        }
        return () => {
            dispatch(SetCurrentChatMessagesActionCreator([]))
        }
    }, [Chat])

    useEffect(() => {
        if (CurrentChatMessages && Chat) {
            if (CurrentChatMessages.length !== 0 && !FirstScroll.current) {
                FirstScroll.current = true;
                ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
            } else if (CurrentChatMessages.length !== 0 && !scrollValues.scrollButton) {
                ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
            }
        }
    }, [Chat, CurrentChatMessages])

    let messagesList = useMemo(() => CurrentChatMessages ? (CurrentChatMessages.length !== 0 && CurrentChatMessages.map(item => item.senderUserName === UserInfo.userName ?
        <li className="Messages-Item" style={{alignSelf: "flex-end"}}>
            <div className="Messages-Item-Content">
                <img className="Messages-Item-Image"
                     src={UserInfo.profileImage ? (UserInfo.profileImage.url) : (DefaultIcon)}
                     alt={DefaultIcon}/>
                <div className="Messages-Item-Content-Wrapper"
                     style={{backgroundColor: "#12569a", color: "white"}}>
                    <span className="Messages-Item-Text">{item.text}</span>
                    <span className="Messages-Item-Date"
                          style={{color: "#a9a9a9"}}>{item.sent.split("T")[1].split(".")[0].substring(0, 5)}</span>
                </div>
            </div>
        </li>
        :
        <li className="Messages-Item" style={{alignSelf: "flex-start"}}>
            <div className="Messages-Item-Content">
                <img className="Messages-Item-Image"
                     src={Chat?.otherProfileImage ? (Chat.otherProfileImage?.url) : (DefaultIcon)}
                     alt={DefaultIcon}/>
                <div className="Messages-Item-Content-Wrapper">
                    <span className="Messages-Item-Text">{item.text}</span>
                    <span className="Messages-Item-Date">{item.sent.split("T")[1].split(".")[0].substring(0, 5)}</span>
                </div>
            </div>
        </li>)) : null, [Chat, CurrentChatMessages, UserInfo]);

    return (
        <div className="Messages" style={UserInfo?.backgroundImage && {
            background: `url(${UserInfo.backgroundImage.url}) no-repeat center center / cover`,
        }}>
            {Chat ?
                <div className="Messages-Content">
                    <div className="Messages-Header">
                        <div className="Messages-Header-Content">
                            <div className="Back-Button"
                                 onClick={() => dispatch(SetSideBarStatusActionCreator(!SideBarStatus))}>
                                <ArrowBackIcon/>
                            </div>
                            <div className="profile-info">
                                <img src={Chat.otherProfileImage ? (Chat.otherProfileImage.url) : (DefaultIcon)}
                                     alt={DefaultIcon} loading="lazy"/>
                                <p>{Chat.otherName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="Messages-Content-Scroll" onScroll={handleScroll} ref={ScrollRef}
                         style={UserInfo?.backgroundImage && {
                             background: `url(${UserInfo.backgroundImage.url}) no-repeat center center / cover`,
                         }}>
                        <ul className="Messages-List">
                            {messagesList}
                            <li style={{width: 0, height: 0}} ref={FirstMessage}></li>
                        </ul>
                    </div>

                    <div className="Messages-Tools">
                        <TextareaAutosize className="Messages-Tools-Textarea" value={input}
                                          autoComplete="off"
                                          maxRows={3}
                                          placeholder="Type here..."
                                          onKeyDown={(e) => {
                                              if (e.key === "Enter" && !e.shiftKey) {
                                                  e.preventDefault();
                                                  handleSubmit()
                                              }
                                          }}
                                          onChange={e => setInput(e.target.value)}
                                          onClick={() => console.log(ScrollRef.current.clientHeight)}
                        />
                        <button className="Messages-Tools-Button" onClick={handleSubmit}>
                            <SendIcon/>
                        </button>
                        <div className="Messages-Tools-Downward-Button"
                             style={!scrollValues.scrollButton ? {display: "none"} : {display: "flex"}}
                             onClick={() => {
                                 ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
                                 changeScrollValues("scrollButton")(false);
                             }}>
                            <ArrowDownwardIcon/>
                        </div>
                    </div>
                </div>
                : null}
        </div>);
};

export default React.memo(Messages);