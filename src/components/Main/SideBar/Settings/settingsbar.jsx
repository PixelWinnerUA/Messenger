import React, {useEffect} from 'react';
import "../../../../styles/SettingsBar.scss"

const Settingsbar = ({SearchUsers, SearchInput, setSearchInput, isActive, setActive}) => {

    useEffect(() => {
        if (SearchInput) {
            SearchUsers(SearchInput);
        }
    }, [SearchInput])

    return (
        <div className="Settingsbar">
            <div className={isActive ? "Burger-Settings open" : "Burger-Settings"}
                 onClick={() => setActive(!isActive)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <input className="Search-Block" placeholder="Search"
                   onChange={e => setSearchInput(e.target.value.trim())}/>
        </div>
    );
};

export default Settingsbar;