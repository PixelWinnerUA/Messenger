import React, {useEffect} from 'react';
import "../../styles/Error404.scss"
import {useNavigate} from "react-router-dom";


const Error404 = () => {
    const history = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            history("/");
        }, 10000)
    },[])
    return (
        <div className="Page-404">
            <div className="Message-Error">
                <h1>Page not found</h1>
                <p>After 10 seconds you will be redirected to the home page</p>
            </div>
        </div>
    );
};

export default Error404;