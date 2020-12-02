import './Header.css';
import React from 'react';
import Toggle from './Toggle';

function Header() {
    return (
        <div className="heading">
            <div className="siteName">devjobs</div>
            <Toggle/>
        </div>
    );
}
  
export default Header;