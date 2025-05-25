import React, { useState, useEffect } from 'react';
import './SystemTray.scss';

const SystemTray = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            const minutesStr = minutes < 10 ? '0' + minutes : minutes;
            setCurrentTime(`${hours}:${minutesStr} ${ampm}`);
        };

        updateTime(); // Initial call to set time immediately
        const timerId = setInterval(updateTime, 1000); // Update every second

        return () => {
            clearInterval(timerId); // Cleanup interval on component unmount
        };
    }, []);

    return (
        <div className="system-tray-right">
            <div className="tray-clock">
                {currentTime}
            </div>
        </div>
    );
};

export default SystemTray;
