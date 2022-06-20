import React from 'react';
import "../../../../styles/SettingsBar.scss"

const Settingsbar = ({GetUsers, SetSearchInput, isActive, setActive}) => {
    const handleChange = (input) => {
        SetSearchInput(input)
        if (input) {
            GetUsers(input);
        }
    }
    return (
        <div className="Settingsbar">
            <div className={!isActive ? ("Burger-Settings open") : "Burger-Settings"}
                 onClick={() => setActive(!isActive)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <input className="Search-Block" placeholder="Search"
                   onChange={e => handleChange(e.target.value.trim())}/>
        </div>
    );
};

export default Settingsbar;