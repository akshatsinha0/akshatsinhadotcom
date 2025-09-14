import React, { useState } from 'react';
import './TerminalIcon.css';
interface TerminalIconProps {
  onClick: () => void;
}
const TerminalIcon: React.FC<TerminalIconProps> = ({ onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClick();
      setIsAnimating(false);
    }, 1200);
  };
  return (
    <div
      className={`terminal-icon ${isAnimating ? 'spinning' : ''}`}
      onClick={handleClick}
    >
      <div className="terminal-icon-content">
        <div className="icon-screen">
          <div className="icon-line"></div>
          <div className="icon-line"></div>
          <div className="icon-line"></div>
        </div>
      </div>
      <div className="terminal-tail"></div>
      <div className="tooltip">
        Click me to open Akshat's Terminal
      </div>
    </div>
  );
};
export default TerminalIcon;
