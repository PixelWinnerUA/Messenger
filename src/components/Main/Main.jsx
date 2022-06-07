import React from 'react';
import "../../styles/Main.scss"
import Content from "./Content/Content";
import SideBarContainer from "./SideBar/sidebarcontainer";

const Main = () => {
    return (
        <div className="Main">
            <div className="container">
                <SideBarContainer/>
                <Content />
            </div>
        </div>
    );
};

export default Main;