import React from 'react';
import "../../../../styles/SettingsBar.scss"

const SettingsBar = ({setSearchInput, isActive, setActive}) => {

    return (
        <div className="SettingsBar">
            <div className={isActive ? "Burger-Settings open" : "Burger-Settings"}
                 onClick={() => setActive(!isActive)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <input className="Search-Block" placeholder="Search"
                   onChange={e => {
                       setSearchInput(e.target.value.trim());
                       setActive(false);
                   }}/>
        </div>
    );
};

export default SettingsBar;