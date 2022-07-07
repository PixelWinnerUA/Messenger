import React, {useState} from 'react';
import "../../../styles/Messages.scss"
import "../../../styles/Space-Background.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DefaultIcon from "../../../assets/img/Default-Profile-Icon.png";
import {getCurrentChat} from "../../../store/reducers/chatsSelector";
import {useSelector} from "react-redux";

const Messages = ({sidebarStatus, setSideBarStatus, connection}) => {

    const Chat = useSelector(getCurrentChat)
    const [input, setInput] = useState("")

    return (
        <div className="Messages">
            <div className="Messages-Content">
                {Chat ? <div className="Messages-Header">
                    <div className="Messages-Header-Content">
                        <div className="Back-Button" onClick={() => setSideBarStatus(!sidebarStatus)}>
                            <ArrowBackIcon/>
                        </div>
                        <div className="profile-info">
                            <img src={Chat.otherProfileImage ? (Chat.otherProfileImage.url) : (DefaultIcon)}
                                 alt={DefaultIcon} loading="lazy"/>
                            <p>{Chat.otherName}</p>
                        </div>
                    </div>
                </div> : null}

                <p>Your messages</p>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (connection) {
                        connection.invoke("SendMessage", {
                            text: input,
                            RecipientUserName: Chat.otherUserName
                        })
                    }
                }}>
                    <input value={input} onChange={(e) => setInput(e.target.value)}/>
                    <button type="submit">Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Messages;