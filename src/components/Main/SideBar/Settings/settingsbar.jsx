import React, {useEffect} from 'react';
import "../../../../styles/SettingsBar.scss"
import {useDispatch} from "react-redux";
import {fetchUsers} from "../../../../store/reducers/usersReducer";

const SettingsBar = ({SearchInput, setSearchInput, isActive, setActive}) => {


    const dispatch = useDispatch();

    useEffect(() => {
        if (SearchInput) {
           dispatch(fetchUsers(SearchInput))
        }
    }, [SearchInput])

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