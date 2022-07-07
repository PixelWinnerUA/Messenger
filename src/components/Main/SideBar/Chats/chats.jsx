import React from 'react';
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png";
import "../../../../styles/Chats.scss"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useDispatch} from "react-redux";
import {SetCurrentChatActionCreator} from "../../../../store/reducers/chatsReducer";

const Chats = ({sidebarStatus, setSideBarStatus, chats}) => {
    const dispatch = useDispatch();
    const handleClick = (user) => {
        setSideBarStatus(!sidebarStatus);
        dispatch(SetCurrentChatActionCreator(user));
    }

    let chatList = chats && chats.length !== 0 && chats.map(item => <li key={item.otherName}>
        <div className="Chat-Item" onClick={() => handleClick({
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
                    <p>{item.lastMessage}</p>
                </div>
            </div>
        </div>
    </li>)


    return (
        <div>
            <div className="Back-Button" onClick={() => setSideBarStatus(!sidebarStatus)}><ArrowBackIcon/></div>
            {chatList ? <ul>{chatList}</ul> : <p style={{margin: 10}}>It's too empty...</p>}
        </div>
    );
};

export default Chats;