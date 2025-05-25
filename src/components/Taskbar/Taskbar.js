import React from "react";
import "./Taskbar.scss";
import StartButton from "./components/StartButton/StartButton";
import SystemTray from "./components/SystemTray/SystemTray";

const Taskbar = ({ openWindows, activeWindowId, onActivateWindow }) => {
    return (
        <div className="taskbar-bottom">
            <div className="taskbar-startbutton-wrapper"> {/* Optional wrapper */}
                <StartButton />
            </div>

            <div className="taskbar-app-buttons">
                {openWindows.map(win => (
                    <button
                        key={win.id}
                        className={`taskbar-app-button ${win.id === activeWindowId ? 'active' : ''}`}
                        onClick={() => onActivateWindow(win.id)}
                    >
                        {/* Icon could go here in future */}
                        {win.title}
                    </button>
                ))}
            </div>

            <div className="taskbar-systemtray">
                <SystemTray />
            </div>
        </div>
    );
};

export default Taskbar;
