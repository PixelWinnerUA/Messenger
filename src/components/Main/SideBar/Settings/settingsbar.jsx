import React, {useEffect} from 'react';
import "../../../../styles/SettingsBar.scss"

const SettingsBar = ({SearchUsers, SearchInput, setSearchInput, isActive, setActive}) => {

    useEffect(() => {
        if (SearchInput) {
            SearchUsers(SearchInput);
        }
    }, [SearchUsers, SearchInput])

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
                       setSearchInput(e.target.value.trim())
                       setActive(false)
                   }}/>
        </div>
    );
};

export default SettingsBar;