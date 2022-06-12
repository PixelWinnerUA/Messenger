import React from 'react';
import axios from "axios";

const Chats = () => {

    const getChats = async () => {
        return await axios.get('api/users/' + JSON.parse(localStorage.getItem("user")).userName + '/chats')
            .then(response => response.data)
    }

    const getMessages = async () => {
        return await axios.get('api/chats/' + 1).then(response => response.data)
    }

    return (
        <div>
            <button onClick={() => {
                getChats().then(response => {
                    console.log(response)
                })
            }}>get chats
            </button>

            <button onClick={() => {
                getMessages().then(response => {
                    console.log(response)
                });
            }}>get messages
            </button>

        </div>
    );
};

export default Chats;