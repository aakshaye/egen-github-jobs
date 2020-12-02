import './JobDetail.css';
import React from 'react';
import Moment from 'react-moment';

function JobDetail({companyLogo, type, position, companyName, location, createdTime, description, companyURL, howToApply}) {
        return (
        <div className="jobDetail">
            <div className="jobHeading">
                <img className="companyLogo" src={companyLogo} alt="logo"/>
                <div className="companyName">
                    {companyName}
                    <a href={companyURL} className="companyURL">
                        {companyURL}
                    </a>
                </div>
                <button className="companySite">
                    <a className="redirectLink" href={companyURL}>
                        Company Site
                    </a>
                </button>
            </div>
            <div className="jobDetails">
                <div className="basicInfo">
                    <div className="jobInfo">
                        <div className="timeWithType">
                            <span className="timePosted">
                                <Moment date={createdTime} fromNow/>
                            </span>
                            <span className="dot">&middot;</span>
                            <span className="jobType">{type}</span>
                        </div>        
                        <div className="position">
                            {position}
                        </div>
                        <div className="locations">
                            {location}
                        </div>   
                    </div>
                    <button className="applyButton">
                        <a className="redirectLink" href={companyURL}>
                            Apply Now
                        </a>
                    </button>                 
                </div>
                
                <div className="description">
                    {description}
                </div>
            </div>
            <div className="howToApply">
                How to Apply<br/>
                {howToApply}
            </div>
        </div>
    );
}
  
export default JobDetail;