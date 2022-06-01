import React from 'react';
import "../styles/Main.scss"
import Sidebar from "./sidebar";
import Content from "./Content";

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