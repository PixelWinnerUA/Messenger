import React from 'react';
import "../../../../styles/Users.scss";
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png"
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {getSearchStatus, getUserList} from "../../../../store/reducers/usersSelector";

const Users = () => {
    const UsersList = useSelector(getUserList)
    const SearchStatus = useSelector(getSearchStatus)

    let Users = UsersList.length === 0 ?
        <li style={{margin: "10px"}}>User is not found</li>
        :
        UsersList.map(item => <li key={item.userName}>
            <div className="User">
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
        </li>)

    return (
        <div className="Users">
            {SearchStatus ?
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                    <CircularProgress/></div> : <ul>{Users}</ul>}
        </div>
    );
};

export default Users;
