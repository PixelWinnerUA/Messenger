import React, {useState} from 'react';
import "../../styles/Main.scss"
import Messages from "./Messages/messages";
import SideBar from "./SideBar/sidebar";

const Main = () => {
    const [sidebarStatus, setSideBarStatus] = useState(false); //DELETE LATER

    return (
        <div className={sidebarStatus ? "Main active" : "Main"}>
            <SideBar sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus}/>
            <Messages sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus}/>
        </div>
    );
};

export default Main;