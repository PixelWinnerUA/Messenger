import React from 'react';
import "../../../../styles/Users.scss";
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png"
import {CircularProgress} from "@mui/material";


const Users = ({UsersList, SearchStatus}) => {

    let Users = UsersList.length === 0 ?
        <li style={{margin: "10px"}}>User is not found</li>
        :
        UsersList.map(item => <li key={item.userName}>
            <div className="User">
                <img src={item.photo ? (`data:image/jpeg;base64,${item.photo.bytes}`) : (DefaultIcon)}
                     alt={DefaultIcon} style={{
                    objectPosition: "center center",
                    objectFit: "cover",
                    height: 50,
                    width: 50,
                    margin: "0 10px",
                    borderRadius: "50%"
                }}/>

                <div className="info">
                    <div className="name">
                        <p>{item.name}</p>
                    </div>
                    <div className="userName">
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
