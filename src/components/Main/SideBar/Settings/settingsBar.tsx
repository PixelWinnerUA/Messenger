import React, {useEffect} from 'react';
import "../../../../styles/SettingsBar.scss"


interface SettingsBarPropsType {
    fetchSearch: Function,
    SearchInput: string,
    setSearchInput: Function,
    isActive: boolean,
    setActive: Function
}

const SettingsBar = ({fetchSearch, SearchInput, setSearchInput, isActive, setActive}: SettingsBarPropsType) => {

    useEffect(() => {
        if (SearchInput) {
            fetchSearch({input: SearchInput})
        }
    }, [SearchInput, fetchSearch])

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

export default React.memo(SettingsBar);