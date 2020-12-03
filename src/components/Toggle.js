import './Toggle.css';
import React from 'react';

function Toggle({handleDarkModeToggle}) {
    return (
        <div className="lightDarkToggle">
            <span className="sunSymbol">&#9788;</span>
            <label className="switch">
                <input type="checkbox" name="darkModeToggle" onChange={handleDarkModeToggle}/>
                <span className="slider round"></span>
            </label>
            <span className="moonSymbol">&#9790;</span>
        </div>
    );
}    
  
export default Toggle;