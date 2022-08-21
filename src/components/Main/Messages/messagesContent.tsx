import React, {RefObject, UIEventHandler, useEffect, useRef} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// @ts-ignore
import DefaultIcon from "../../../assets/img/Default-Profile-Icon.png";
import {TextareaAutosize} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {useDispatch, useSelector} from "react-redux";
import {getSideBarStatus} from "../../../store/reducers/sidebarSelector";
import {SideBarActionsCreators} from "../../../store/reducers/sidebarReducer";
import {CurrentChat, Message} from "../../../types/chatsReducerTypes";
import {scrollValues} from "./messages";
import {UserType} from "../../../types/sidebarReducerTypes";


interface MessagesContentPropsType {
    handleSubmit: Function,
    handleScroll: UIEventHandler<HTMLDivElement>,
    messagesList: JSX.Element[] | undefined,
    UserInfo: undefined | UserType,
    ScrollRef: RefObject<HTMLDivElement>,
    setInput: Function,
    input: string,
    CurrentChat: undefined | CurrentChat,
    scrollValues: scrollValues,
    changeScrollValues: Function,
    CurrentChatMessages: Message[]
}

const MessagesContent = ({
                             handleSubmit,
                             handleScroll,
                             messagesList,
                             UserInfo,
                             ScrollRef,
                             setInput,
                             input,
                             CurrentChat,
                             scrollValues,
                             changeScrollValues,
                             CurrentChatMessages
                         }: MessagesContentPropsType) => {

    const dispatch = useDispatch();
    const SideBarStatus = useSelector(getSideBarStatus);
    const FirstScroll = useRef(false);

    useEffect(() => {
        if (CurrentChatMessages && CurrentChat) {
            if (CurrentChatMessages.length !== 0 && !FirstScroll.current && ScrollRef.current) {
                FirstScroll.current = true;
                ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
            } else if (CurrentChatMessages.length !== 0 && !scrollValues.scrollButton && ScrollRef.current) {
                ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
            }
        }
        return () => {
            FirstScroll.current = false;
        }
    }, [CurrentChat, CurrentChatMessages])

    useEffect(() => {
        return () => {
            dispatch(SideBarActionsCreators.SetSideBarStatusActionCreator(false))
        }
    }, [])

    return (
        <div className="Messages-Content">
            <div className="Messages-Header">
                <div className="Messages-Header-Content">
                    <div className="Back-Button"
                         onClick={() => dispatch(SideBarActionsCreators.SetSideBarStatusActionCreator(!SideBarStatus))}>
                        <ArrowBackIcon/>
                    </div>
                    <div className="profile-info">
                        <img src={CurrentChat?.otherProfileImage ? (CurrentChat?.otherProfileImage.url) : (DefaultIcon)}
                             alt={DefaultIcon} loading="lazy"/>
                        <p>{CurrentChat?.otherName}</p>
                    </div>
                </div>
            </div>
            <div className="Messages-Content-Scroll" onScroll={handleScroll} ref={ScrollRef}
                 style={UserInfo?.backgroundImage ? {
                     background: `url(${UserInfo.backgroundImage.url}) no-repeat center center / cover`,
                 } : undefined}>
                <ul className="Messages-List">
                    {messagesList}
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
                                  onClick={() => {
                                      if (ScrollRef.current) {
                                          console.log(ScrollRef.current.clientHeight)
                                      }
                                  }}
                />
                <button className="Messages-Tools-Button" onClick={() => handleSubmit()}>
                    <SendIcon/>
                </button>
                <div className="Messages-Tools-Downward-Button"
                     style={!scrollValues.scrollButton ? {display: "none"} : {display: "flex"}}
                     onClick={() => {
                         if (ScrollRef.current) {
                             ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
                         }
                         changeScrollValues("scrollButton")(false);
                     }}>
                    <ArrowDownwardIcon/>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MessagesContent);