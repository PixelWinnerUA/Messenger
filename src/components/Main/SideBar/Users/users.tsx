import React from 'react';
import "../../../../styles/Users.scss";
// @ts-ignore
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png"
import {CircularProgress} from "@mui/material";
import {SideBarActionsCreators} from "../../../../store/reducers/sidebarReducer";
import {ChatsActionsCreators} from "../../../../store/reducers/chatsReducer";
import {Link} from "react-router-dom";
import {getSideBarStatus} from "../../../../store/reducers/sidebarSelector";
import {UserType} from "../../../../types/sidebarReducerTypes";
import {OtherUserType} from "../../../../types/apiTypes";
import {CurrentChat} from "../../../../types/chatsReducerTypes";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

interface UsersPropsType {
    isLoading: boolean,
    usersList: OtherUserType[] | undefined
    UserInfo: undefined | UserType
}

const Users = ({isLoading, usersList, UserInfo}: UsersPropsType) => {

    const dispatch = useTypedDispatch();
    const SideBarStatus = useTypedSelector(getSideBarStatus);

    const handleClick = (chat: CurrentChat) => {
        dispatch(SideBarActionsCreators.SetSideBarStatusActionCreator(!SideBarStatus))
        dispatch(ChatsActionsCreators.SetCurrentChatActionCreator(chat));
    }

    let Users = usersList ? ((usersList.length === 0) ?
        <li style={{margin: "10px"}}>User is not found</li>
        :
        usersList.map(item => <li key={item.userName}>
            <Link to={"/chat"} className="User" onClick={() => handleClick({
                userName: UserInfo?.userName,
                otherName: item.name,
                otherProfileImage: item.profileImage,
                otherUserName: item.userName
            })}>
                <img src={item.profileImage ? (item.profileImage.url) : (DefaultIcon)}
                     alt={DefaultIcon} loading="lazy"/>
                <div className="info">
                    <div className="Name">
                        <p>{item.name}</p>
                    </div>
                    <div className="UserName">
                        <p>@{item.userName}</p>
                    </div>
                </div>
            </Link>
        </li>)) : null;

    return (
        <div className="Users">
            {isLoading ?
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                    <CircularProgress/></div> : <ul>{Users}</ul>}
        </div>
    );
};

export default React.memo(Users);
