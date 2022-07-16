import React, {useEffect, useRef} from 'react';
import {SetSideBarStatusActionCreator} from "../../../store/reducers/appReducer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DefaultIcon from "../../../assets/img/Default-Profile-Icon.png";
import {TextareaAutosize} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {useDispatch, useSelector} from "react-redux";
import {getSideBarStatus} from "../../../store/reducers/appSelector";

const MessagesContent = ({
                             handleSubmit,
                             handleScroll,
                             messagesList,
                             UserInfo,
                             ScrollRef,
                             setInput,
                             input,
                             Chat,
                             scrollValues,
                             changeScrollValues,
                             CurrentChatMessages
                         }) => {

    const dispatch = useDispatch();
    const SideBarStatus = useSelector(getSideBarStatus);
    const FirstScroll = useRef(false);

    useEffect(() => {
        if (CurrentChatMessages && Chat) {
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
    }, [Chat, CurrentChatMessages])

    useEffect(() => {
        return () => {
            dispatch(SetSideBarStatusActionCreator(false))
        }
    }, [])

    return (
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
    );
};

export default React.memo(MessagesContent);