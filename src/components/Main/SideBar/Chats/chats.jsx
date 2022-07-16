import React, {useCallback, useMemo} from 'react';
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png";
import "../../../../styles/Chats.scss"
import {useDispatch, useSelector} from "react-redux";
import {SetCurrentChatActionCreator} from "../../../../store/reducers/chatsReducer";
import {SetSideBarStatusActionCreator} from "../../../../store/reducers/appReducer";
import {getSideBarStatus} from "../../../../store/reducers/appSelector";
import {Link} from "react-router-dom";


const Chats = ({ChatsList, UserInfo}) => {
    const dispatch = useDispatch();
    const SideBarStatus = useSelector(getSideBarStatus);

    const handleClick = useCallback((chat) => {
        dispatch(SetSideBarStatusActionCreator(!SideBarStatus))
        dispatch(SetCurrentChatActionCreator(chat));
    }, [SideBarStatus, dispatch])

    let chatList = useMemo(() => ChatsList ? (ChatsList.length !== 0 && ChatsList.map(item => <li key={item.otherName}>
        <Link to={"/chat"} className="Chat-Item" onClick={() => handleClick({
            userName: UserInfo.userName,
            otherName: item.otherName,
            otherProfileImage: item.otherProfileImage,
            otherUserName: item.otherUserName
        })}>
            <img src={item.otherProfileImage ? (item.otherProfileImage.url) : (DefaultIcon)}
                 alt={DefaultIcon} loading="lazy"/>
            <div className="Chat-Info">
                <div className="Chat-UserName">
                    <p>{item.otherName}</p>
                    <p className="Chat-Date">{item.messageStamp.split("T")[1].split(".")[0].substring(0, 5)}</p>
                </div>
                <div className="Chat-LastMessage">
                    <p>{item.lastMessage ? item.lastMessage.length > 20 ? item.lastMessage.substring(0, 20) + "..." : item.lastMessage : null}</p>
                </div>
            </div>
        </Link>
    </li>)) : null, [ChatsList, UserInfo, handleClick]);

    return (
        <div>
            {chatList ? <ul>{chatList}</ul> : <p style={{margin: 10}}>It's too empty...</p>}
        </div>
    );
};

export default React.memo(Chats);