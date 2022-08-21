import React from 'react';
// @ts-ignore
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png";
import "../../../../styles/Chats.scss"
import {ChatsActionsCreators} from "../../../../store/reducers/chatsReducer";
import {SideBarActionsCreators} from "../../../../store/reducers/sidebarReducer";
import {Link} from "react-router-dom";
import {getSideBarStatus} from "../../../../store/reducers/sidebarSelector";
import {UserType} from "../../../../types/sidebarReducerTypes";
import {Chat, CurrentChat} from "../../../../types/chatsReducerTypes";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

interface ChatsPropsType {
    ChatsList: Chat[],
    UserInfo: undefined | UserType
}

const Chats = ({ChatsList, UserInfo}: ChatsPropsType) => {
    const dispatch = useTypedDispatch();
    const SideBarStatus = useTypedSelector(getSideBarStatus);

    const handleClick = (chat: CurrentChat) => {
        dispatch(SideBarActionsCreators.SetSideBarStatusActionCreator(!SideBarStatus))
        dispatch(ChatsActionsCreators.SetCurrentChatActionCreator(chat));
    }

    let chatList = ChatsList ? (ChatsList.length !== 0 && ChatsList.map(item => <li key={item.otherName}>
        <Link to={"/chat"} className="Chat-Item" onClick={() => handleClick({
            userName: UserInfo?.userName,
            otherName: item.otherName,
            otherProfileImage: item.otherProfileImage,
            otherUserName: item.otherUserName
        })}>
            <img src={item.otherProfileImage ? (item.otherProfileImage.url) : (DefaultIcon)}
                 alt={DefaultIcon} loading="lazy"/>
            <div className="Chat-Info">
                <div className="Chat-UserName">
                    <p>{item.otherName}</p>
                    <p className="Chat-Date">{(new Date(item.messageStamp)).toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                </div>
                <div className="Chat-LastMessage">
                    <p>{item.lastMessage ? item.lastMessage.length > 20 ? item.lastMessage.substring(0, 20) + "..." : item.lastMessage : null}</p>
                </div>
            </div>
        </Link>
    </li>)) : null;

    return (
        <div>
            {chatList ? <ul>{chatList}</ul> : <p style={{margin: 10}}>It's too empty...</p>}
        </div>
    );
};

export default React.memo(Chats);