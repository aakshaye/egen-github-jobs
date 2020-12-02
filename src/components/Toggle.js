import './Toggle.css';
import React from 'react';

function Toggle() {
    return (
        <div className="lightDarkToggle">
            <span className="sunSymbol">&#9788;</span>
            <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
            </label>
            <span className="moonSymbol">&#9790;</span>
        </div>
    );
}
  
export default Toggle;