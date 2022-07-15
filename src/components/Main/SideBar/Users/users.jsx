import React, {useCallback, useMemo} from 'react';
import "../../../../styles/Users.scss";
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png"
import {CircularProgress} from "@mui/material";
import {SetSideBarStatusActionCreator} from "../../../../store/reducers/appReducer";
import {SetCurrentChatActionCreator} from "../../../../store/reducers/chatsReducer";
import {useDispatch, useSelector} from "react-redux";
import {getSideBarStatus} from "../../../../store/reducers/appSelector";


const Users = ({isLoading, usersList, UserInfo}) => {

    const dispatch = useDispatch();
    const SideBarStatus = useSelector(getSideBarStatus);

    const handleClick = useCallback((chat) => {
        dispatch(SetSideBarStatusActionCreator(!SideBarStatus))
        dispatch(SetCurrentChatActionCreator(chat));
    }, [SideBarStatus, dispatch])

    let Users = useMemo(() => usersList ? ((usersList.length === 0) ?
        <li style={{margin: "10px"}}>User is not found</li>
        :
        usersList.map(item => <li key={item.userName}>
            <div className="User" onClick={() => handleClick({
                userName: UserInfo.userName,
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
            </div>
        </li>)) : null, [UserInfo, handleClick, usersList])

    return (
        <div className="Users">
            {isLoading ?
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                    <CircularProgress/></div> : <ul>{Users}</ul>}
        </div>
    );
};

export default React.memo(Users);
