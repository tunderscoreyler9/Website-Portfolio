import React from 'react';
import './Window.scss';

const Window = ({ title, children, isOpen, onClose, isActive, onActivate }) => {
    if (!isOpen) {
        return null;
    }

    const handleWindowMouseDown = (e) => {
        e.stopPropagation(); // Prevent desktop click-through if any
        if (onActivate) {
            onActivate();
        }
    };

    return (
        <div
            className={`window ${isActive ? 'active' : 'inactive'}`}
            onMouseDown={handleWindowMouseDown} // Use onMouseDown to activate before potential drag
        >
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" className="title-bar-button minimize-button"></button>
                    <button aria-label="Maximize" className="title-bar-button maximize-button"></button>
                    <button aria-label="Close" className="title-bar-button close-button" onClick={onClose}></button>
                </div>
            </div>
            <div className="window-body">
                {children}
            </div>
        </div>
    );
};

export default Window;
