import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8081'); 

function Notification({ email }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.emit('join', email);

        socket.on('notification', (message) => {
            setNotifications((prev) => [...prev, message]);
            alert(`New notification: ${message}`); 
        });

        return () => {
            socket.disconnect();
        };
    }, [email]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index}>{notif}</li>
                ))}
            </ul>
        </div>
    );
}

export default Notification;
