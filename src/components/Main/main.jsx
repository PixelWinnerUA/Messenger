import React, {useState, useEffect} from 'react';
import "../../styles/Main.scss"
import Messages from "./Messages/messages";
import SideBar from "./SideBar/sidebar";
import * as signalR from "@microsoft/signalr";

const Main = () => {
    const [sidebarStatus, setSideBarStatus] = useState(false); //DELETE LATER
    //SignalR socket connection
    const [connection, setConnection] = useState(null);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        if (localStorage.AUTH_TOKEN) {
            (async () => {
                const newConnection = new signalR.HubConnectionBuilder()
                    .withUrl('/hubs/chat', {
                        accessTokenFactory: () => localStorage.AUTH_TOKEN.split(" ")[1]
                    }) // Ensure same as BE
                    .configureLogging(signalR.LogLevel.Information)
                    .withAutomaticReconnect([1000, 3000, 5000, null])
                    .build();
                newConnection.on('GetChats', (data) => {
                    console.log(data)
                    setChats(data)
                });

                newConnection.on('GetMessage', (data) => {
                    console.log(data)
                });
                await newConnection.start();
                setConnection(newConnection);
            })();
            return () => {
                connection.stop()
            }
        }
    }, [])
    // SignalR socket connection
    if (connection) {
        console.log(connection)
    }
    return (
        <div className={sidebarStatus ? "Main active" : "Main"}>
            <SideBar sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus} chats={chats}/>
            <Messages sidebarStatus={sidebarStatus} setSideBarStatus={setSideBarStatus} connection={connection}/>
        </div>
    );
};

export default Main;