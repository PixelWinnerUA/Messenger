import React from 'react';
import {CircularProgress} from "@mui/material";
import "../../styles/Preloader.scss"

const Preloader = () => {
    return (
        <div className="Preloader">
            <CircularProgress/>
        </div>
    );
};

export default Preloader;