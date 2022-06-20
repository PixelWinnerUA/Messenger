import React from 'react';
import "../../../../styles/Users.scss";
import DefaultIcon from "../../../../assets/img/Default-Profile-Icon.png"
import {CircularProgress} from "@mui/material";


const Users = ({UsersList, SearchStatus}) => {

    let Users = UsersList.map(item => <li key={item.userName}>
        <div className="User">{
            item.photo ?
                <div style={{
                    gridArea: "icon",
                    background: `url(data:image/jpeg;base64,${item.photo.bytes})`, // img src ={`data:image/jpeg;base64,${item.photo.bytes}`}
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    height: 50,
                    width: 50,
                    overflow: "hidden",
                    outline: "none",
                    margin: "0 10px",
                    borderRadius: "50%"
                }}/>
                :
                <div style={{
                    gridArea: "icon",
                    background: "url(" + DefaultIcon + ")",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    height: 50,
                    width: 50,
                    overflow: "hidden",
                    outline: "none",
                    margin: "0 10px",
                    borderRadius: "50%"
                }}/>}

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
