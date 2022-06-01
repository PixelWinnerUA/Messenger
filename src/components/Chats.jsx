import React, {useEffect} from 'react';
import "../styles/Chats.scss";


const Chats = (props) => {

    const {GetUsers} = props;
    useEffect(() => {
        GetUsers()
    }, [GetUsers])

    let ChatsList = props.ChatsList.map(item => <li key={item.name}>
        <div className="Item"> {item.name} </div>
    </li>)

    return (
        <div className="Chats">
            <div className="Chats-Scroll">
                <ul>{ChatsList}</ul>
            </div>
        </div>
    );
};

export default Chats;
