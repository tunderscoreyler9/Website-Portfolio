import React, { useState } from 'react';
import './App.css';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';

// Portfolio components are not directly needed in App.js if Desktop.js handles passing the type
// import AboutMe from './components/portfolio_sections/AboutMe';
// import Projects from './components/portfolio_sections/Projects';
// import Contact from './components/portfolio_sections/Contact';

function App() {
  const [openWindows, setOpenWindows] = useState({});
  const [activeWindowId, setActiveWindowId] = useState(null);

  const handleOpenWindow = (windowData) => {
    // windowData: { id, title, contentType, contentPayload (this is the component type or text) }
    setOpenWindows(prev => ({
      ...prev,
      [windowData.id]: {
        isOpen: true,
        title: windowData.title,
        contentType: windowData.contentType,
        contentPayload: windowData.contentPayload // Store component type or text
      }
    }));
    setActiveWindowId(windowData.id);
  };

  const handleCloseWindow = (windowId) => {
    setOpenWindows(prev => {
      const newOpenWindows = { ...prev };
      if (newOpenWindows[windowId]) {
        newOpenWindows[windowId] = { ...newOpenWindows[windowId], isOpen: false };
      }
      return newOpenWindows;
    });

    if (activeWindowId === windowId) {
      const openWindowIds = Object.keys(openWindows).filter(id => id !== windowId && openWindows[id]?.isOpen);
      setActiveWindowId(openWindowIds.length > 0 ? openWindowIds[openWindowIds.length - 1] : null);
    }
  };

  const handleActivateWindow = (windowId) => {
    setActiveWindowId(windowId);
  };

  const currentlyOpenWindows = Object.entries(openWindows)
    .filter(([id, win]) => win.isOpen)
    .map(([id, win]) => ({ id, title: win.title })); // Taskbar only needs id and title

  return (
    <div className='App'>
      <Desktop
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onOpenWindow={handleOpenWindow}
        onCloseWindow={handleCloseWindow}
        onActivateWindow={handleActivateWindow}
      />
      <Taskbar
        openWindows={currentlyOpenWindows}
        activeWindowId={activeWindowId}
        onActivateWindow={handleActivateWindow}
      />
    </div>
  );
}

export default App;
