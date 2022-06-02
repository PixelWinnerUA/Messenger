import React from 'react';
import "../../styles/Main.scss"
import Sidebar from "./Chats/SideBar/sidebar";
import Content from "./Chats/Content/Content";

const Main = () => {
    return (
        <div className="Main">
            <div className="container">
                <Sidebar/>
                <Content/>
            </div>
        </div>
    );
};

export default Main;