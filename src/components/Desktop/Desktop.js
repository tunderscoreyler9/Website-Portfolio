import React from 'react';
import './Desktop.scss';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import Window from '../Window/Window';
// Import portfolio components directly for mapping
import AboutMe from '../portfolio_sections/AboutMe';
import Projects from '../portfolio_sections/Projects';
import Contact from '../portfolio_sections/Contact';

const initialDesktopIcons = [
    { id: 'my-computer', label: 'My Computer', windowId: 'myComputerWindow', contentType: 'text', content: 'Contents of My Computer' },
    { id: 'recycle-bin', label: 'Recycle Bin', windowId: 'recycleBinWindow', contentType: 'text', content: 'Contents of Recycle Bin' },
    { id: 'documents', label: 'My Documents', windowId: 'myDocumentsWindow', contentType: 'text', content: 'Contents of My Documents' }, // Added this based on previous setup
    { id: 'about-me', label: 'About Me', windowId: 'aboutMeWindow', contentType: 'component', contentComponent: AboutMe },
    { id: 'projects', label: 'Projects', windowId: 'projectsWindow', contentType: 'component', contentComponent: Projects },
    { id: 'contact', label: 'Contact', windowId: 'contactWindow', contentType: 'component', contentComponent: Contact }
];

const Desktop = ({ openWindows, activeWindowId, onOpenWindow, onCloseWindow, onActivateWindow }) => {
    const handleIconDoubleClick = (icon) => {
        onOpenWindow({ // Pass data to App.js
            id: icon.windowId,
            title: icon.label,
            contentType: icon.contentType,
            // Pass the component type directly if 'component', or text content if 'text'
            contentPayload: icon.contentType === 'component' ? icon.contentComponent : icon.content
        });
    };

    return (
        <div className='desktop'>
            <div className="desktop-icons-container">
                {initialDesktopIcons.map(icon => (
                    <DesktopIcon
                        key={icon.id}
                        label={icon.label}
                        onDoubleClick={() => handleIconDoubleClick(icon)}
                    />
                ))}
            </div>

            {Object.entries(openWindows).map(([id, win]) => {
                if (!win.isOpen) return null;

                let windowContent;
                if (win.contentType === 'component' && win.contentPayload) {
                    const ContentComponent = win.contentPayload; // This is the component type
                    windowContent = <ContentComponent />;
                } else if (win.contentType === 'text') {
                    windowContent = <p>{win.contentPayload}</p>; // Text content
                } else {
                    // Fallback for older states or misconfigured icons
                    windowContent = <p>No content specified or content type is unknown.</p>;
                }

                return (
                    <Window
                        key={id}
                        title={win.title}
                        isOpen={win.isOpen}
                        onClose={() => onCloseWindow(id)}
                        isActive={id === activeWindowId}
                        onActivate={() => onActivateWindow(id)}
                    >
                        {windowContent}
                    </Window>
                );
            })}
        </div>
    );
};
export default Desktop;
