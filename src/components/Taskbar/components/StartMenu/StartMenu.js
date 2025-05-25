import React from 'react';
import './StartMenu.scss';

const StartMenu = ({ isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="start-menu">
      <ul>
        <li className="start-menu-item">Programs</li>
        <li className="start-menu-item">Documents</li>
        <li className="start-menu-item">Settings</li>
        <li className="start-menu-item">Find</li>
        <li className="start-menu-item">Help</li>
        <li className="start-menu-item">Run...</li>
        <li className="start-menu-item separator"></li>
        <li className="start-menu-item">Shut Down...</li>
      </ul>
    </div>
  );
};

export default StartMenu;
