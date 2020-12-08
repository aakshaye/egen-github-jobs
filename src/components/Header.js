import './Header.css';
import React from 'react';
import Toggle from './Toggle';

function Header({handleDarkModeToggle}) {
    return (
        <div className="heading">
            <div className="siteName">
                <a href="/" className="home">devjobs</a>
            </div>
            <Toggle 
                handleDarkModeToggle={handleDarkModeToggle}
            />
        </div>
    );
}
  
export default Header;