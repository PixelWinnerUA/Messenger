import React, {useState} from 'react';
import "../../styles/Main.scss"
import Messages from "./Messages/Messages";
import SideBarContainer from "./SideBar/sidebarcontainer";

const Main = () => {
    const [sidebarStatus, setSideBarStatus] = useState(false); //DELETE LATER

    return (
        <div className={sidebarStatus ? "Main active" : "Main"}>
            <SideBarContainer sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus}/>
            <Messages sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus}/>
        </div>
    );
};

export default Main;