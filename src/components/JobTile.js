import './JobTile.css';
import React from 'react';
import Moment from 'react-moment';

function JobTile({companyLogo, type, position, companyName, location, createdTime}) {
        return (
        <div className="jobTile">
            <img className="companyLogo" src={companyLogo} alt="logo"/>
            <div className="timeWithType">
                <span className="timePosted">
                    <Moment date={createdTime} fromNow/>
                </span>
                <span className="dot">&middot;</span>
                <span className="jobType">{type}</span>
            </div>        
            <div className="position truncate">
                {position}
            </div>
            <div className="companyName">
                {companyName}
            </div>
            <div className="locations">
                {location}
            </div>
        </div>
    );
}
  
export default JobTile;