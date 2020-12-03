import './Header.css';
import React from 'react';
import Toggle from './Toggle';

function Header({handleDarkModeToggle}) {
    return (
        <div className="heading">
            <div className="siteName">devjobs</div>
            <Toggle 
                handleDarkModeToggle={handleDarkModeToggle}
            />
        </div>
    );
}
  
export default Header;