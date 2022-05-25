import React from 'react';
import "../styles/SettingsBar.scss"

const Settingsbar = () => {

    let readjson = () =>{
        fetch('http://bekirov-001-site1.itempurl.com/test')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }

    return (
        <div className="Settingsbar">
            Search
            <button onClick={() => readjson()}>Click</button>
        </div>
    );
};

export default Settingsbar;