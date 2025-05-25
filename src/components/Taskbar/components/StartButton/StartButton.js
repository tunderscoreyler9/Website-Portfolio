import React, { useState, useEffect, useRef } from "react";
import "./StartButton.scss";
import windows95Logo from "../../../../assets/images/windows-95-logo.png";
import StartMenu from "../StartMenu/StartMenu";

const StartButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const startButtonRef = useRef(null);
  const startMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen &&
          startButtonRef.current && 
          !startButtonRef.current.contains(event.target) &&
          startMenuRef.current &&
          !startMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    // NB: The refs are attached to the button and the StartMenu wrapper div respectively.
    // The StartButton component itself returns a React Fragment <> ... </> implicitly
    // if we don't add a wrapper div here.
    // For the click-outside-to-close logic to work correctly,
    // the `startButtonRef` should ideally be on the element that triggers the menu,
    // and `startMenuRef` on the menu itself.
    // The provided JS has the `startButtonRef` on a div wrapping the button,
    // and `startMenuRef` on a div wrapping the StartMenu.
    // This structure is acceptable.
    <div ref={startButtonRef}>
      <button className="start-button" onClick={toggleMenu}>
        <img src={windows95Logo} alt="Windows 95 Logo" className="windows-logo" />
        <span className="start-text">Start</span>
      </button>
      <div ref={startMenuRef}>
        <StartMenu isOpen={isMenuOpen} />
      </div>
    </div>
  );
};

export default StartButton;
